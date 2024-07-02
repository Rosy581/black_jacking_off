require("firebase/firestore")

const retrieve = async (db, col, doc) => {
    const docRef = db.collection(col).doc(doc)
    try {
        const retrieveData = await docRef.get()
        if (retrieveData.exists) {
            return retrieveData.data()
        }
    } catch (error) {
        throw new Error("FAILED TO RETRIEVE DOCUMENT")
    }
}

const push = async (db, col, doc, obj) => {
    try {
        db.collection(col)
            .doc(doc)
            .update(obj).then(() => {
                console.log(`${col}/${doc} updated to to ${obj.toString()}`)
            })
    } catch {
        throw new Error("FAILED TO SET DOCUMENT")
    }
}

const pullColl = async (db, col) => {
    let arr = []
    const ref = db.collection(col)
    const dat = await ref.get() 
    dat.forEach(doc => {
        arr.push(doc.data())
    });
    return arr
};
/*
const cityRef = db.collection('cities').doc('SF');
const doc = await cityRef.get();
if (!doc.exists) {
  console.log('No such document!');
} else {
  console.log('Document data:', doc.data());
}
*/
const pull = async (db, col, doc) => {
    const dat = await retrieve(db, col, doc)
    return dat
}

const sleep = (ms) => {
    return new Promise((ap) => { setTimeout(ap, ms) })
}

module.exports = { pull, sleep, pullColl, push }