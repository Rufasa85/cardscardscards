// : Install the following package:
import { openDB } from 'idb';

// : Complete the initDb() function below:
const initdb = async () => {
    await openDB("cardz",1,{
        upgrade(db){
            if(db.objectStoreNames.contains("savedCards")){
                console.log("db is all ready!")
                return 
            }
            db.createObjectStore("savedCards",{keyPath:"id",autoIncrement:true})
        }
    })
};


//  Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    const db = await openDB("cardz",1);
    const tx = await db.transaction("savedCards","readwrite");
    const store = tx.objectStore("savedCards");
    const result = await store.add({
        name:name,
        home:home,
        cell:cell,
        email:email
    })
    return result
};

//  Complete the getDb() function below:
export const getDb = async () => {
    console.log("get db function")
    const db = await openDB("cardz",1);
    const tx = await db.transaction("savedCards","readonly");
    const store = tx.objectStore("savedCards");
    const result = await store.getAll();
    return result;
  
};

//  Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    const db = await openDB("cardz",1);
    const tx = await db.transaction("savedCards","readwrite");
    const store = tx.objectStore("savedCards");
    const result = await store.delete(id);
    return result;
};

initdb();
