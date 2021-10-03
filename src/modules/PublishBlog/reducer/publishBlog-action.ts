import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import { setStatus } from "./publishBlog-slice";
import { Status } from "@/common/constants/status";
import publishBlog from "@/modules/PublishBlog/api";
import firebaseApp from "@/utils/firebaseApp";

const publishBlogAction =
  (title: string, image: File, blogData: string) =>
  async (dispatch: Function) => {
    dispatch(setStatus(Status.Loading));
    try {
      /** firebase storage instance  */
      const storage = getStorage(firebaseApp);

      /** image file name and file path to store image */
      const imageStorageRef = `Blog-Display-Imgs/${v4()}-${image.name}`;

      /** firebase storage ref instance */
      const storageRef = ref(storage, imageStorageRef);

      /** upload image to firebase storage */
      await uploadBytes(storageRef, image);

      /** get url for image */
      const displayImgUrl = await getDownloadURL(storageRef);

      /** store data in database */
      await publishBlog(title, displayImgUrl, blogData, imageStorageRef);

      dispatch(setStatus(Status.Loaded));
    } catch (e) {
      console.log(e);
      dispatch(setStatus(Status.Error));
    }
  };

export default publishBlogAction;
