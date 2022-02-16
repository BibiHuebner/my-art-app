async function removeFav(
  getDoc,
  updateDoc,
  arrayRemove,
  db,
  user,
  doc,
  artobject
) {
  //we check whether document exists in favCollection, search for id
  //if it exists, do sth
  //if not: alert
  const favoriteRef = doc(db, "favorites", user.uid);
  const favoriteSnap = await getDoc(favoriteRef);
  //if the docsnap exists I want to update the specific document

  if (favoriteSnap.exists()) {
    //check whether we have that artobject in list of favs
    favoriteSnap.data().myFav.forEach(async (oneFav) => {
      if (oneFav.id === artobject.id) {
        console.log("remove item from array");
        await updateDoc(favoriteRef, {
          myFav: arrayRemove(artobject),
        });
      } else {
        console.log("you haven't liked this before");
      }
    });
  } else {
    console.log("Document does not exist");
  }
}
const Favs = { removeFav };
export default Favs;
