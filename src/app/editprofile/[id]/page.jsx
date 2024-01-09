"use client";
import Image from "next/image";
import styles from "./editProfile.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getOneUser } from "@/utils/callAPI";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const storage = getStorage(app);

const EditProfile = ({ params }) => {
  const { id } = params;
  const [dataUser, setDataUser] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(); //hinh anh bg
  const [mediaBg, setMediaBg] = useState(""); //link hinh anh bg
  const [avartar, setAvartar] = useState();
  const [mediaAv, setMediaAv] = useState(""); //link hinh anh av
  const [slogan, setSlogan] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const router = useRouter();
  const options = [
    { id: 1, value: "nam", text: "Nam " },
    { id: 2, value: "nữ", text: "Nữ " },
    { id: 3, value: "khác", text: "Khác " },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await getOneUser(id);
      setDataUser(response);
      setSlogan(response.slogan || "");
      setName(response.name);
      setEmail(response.email);
      // setMediaBg(response.backgroundUser);
      // setAvartar(response.image);
      setBirthday(response.birthDay || "");
      setSex(response.sex || "");
    }
    fetchData();

    const upload = () => {
      const nameBg = new Date().getTime + backgroundImage.name;
      const storageRef = ref(storage, nameBg);

      const uploadTask = uploadBytesResumable(storageRef, backgroundImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaBg(downloadURL);
          });
        }
      );
    };
    const uploadAv = () => {
      const nameAg = new Date().getTime + avartar.name;
      const storageRef = ref(storage, nameAg);

      const uploadTask = uploadBytesResumable(storageRef, avartar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMediaAv(downloadURL);
          });
        }
      );
    };
    backgroundImage && upload();
    avartar && uploadAv();
  }, [id, backgroundImage, avartar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: {
          password: dataUser.password,
          backgroundUser: mediaBg || dataUser.backgroundUser,
          image: mediaAv || dataUser.image,
          slogan: slogan,
          name: name,
          email: email,
          sex: sex,
          birthDay: birthday,
        },
      }),
    });
    if (res.status !== 200) {
      toast.warning("Đã xảy ra lỗi, vui lòng thử lại", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (res.status === 200) {
      toast.success("Cập nhật thông tin thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.backgroundUser}>
            <input
              type="file"
              id="backgroundImage"
              style={{ display: "none" }}
              onChange={(e) => setBackgroundImage(e.target.files[0])}
            />
            <label htmlFor="backgroundImage" style={{ cursor: "pointer" }}>
              <Image src="/image.png" alt="" width={50} height={50} />
            </label>
            {mediaBg && backgroundImage ? "Tải hoàn tất" : ""}
          </div>
          <div className={styles.avartarAndSlogan}>
            <div className={styles.avartar}>
              <input
                type="file"
                id="avatarImage"
                style={{ display: "none" }}
                onChange={(e) => setAvartar(e.target.files[0])}
              />
              <label htmlFor="avatarImage" style={{ cursor: "pointer" }}>
                <UserOutlined style={{ fontSize: 40 }} />
              </label>
              {mediaAv && avartar ? "Tải hoàn tất" : ""}
            </div>
            <textarea
              placeholder="Hãy viết một slogan..."
              className={styles.slogan}
              style={{ resize: "none" }}
              id="slogan"
              name="slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />
          </div>
          <div className={styles.ContainerFormInput}>
            <div className={styles.formInput}>
              <label htmlFor="name">TÊN HIỂN THỊ</label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">TÀI KHOẢN</label>
              <input
                id="email"
                name="email"
                type="text"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="sex">GIỚI TÍNH</label>
              <select
                id="sex"
                name="sex"
                className={styles.selectCategory}
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <label htmlFor="birthday">NGÀY SINH</label>
              <input
                id="birthday"
                name="birthday"
                type="text"
                className={styles.input}
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.btnSave}>
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
