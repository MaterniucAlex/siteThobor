import React from "react";
import nextId from "react-id-generator";
import "../blog/blog.scss";
import "./admin.scss";
import "../apps/apps.scss";
import "../alumni/alumni.scss";
import "../sponsors/sponsors.scss";
import Compressor from "compressorjs";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Post from "../blog/components/Post";
import Generatie from "../alumni/components/Generatie";

import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import Card from "../home/components/Card";

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function Admin() {
  const id = nextId();

  const [user] = useAuthState(auth);
  const signingoagle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const blogRef = firestore.collection("blog");
  const appsRef = firestore.collection("apps");
  const alumniRef = firestore.collection("alumni");
  const aniRef = firestore.collection("ani");
  const memRef = firestore.collection("team_member");
  const sponRef = firestore.collection("sponsors");
  const premiiRef = firestore.collection("premii");

  const query = blogRef.orderBy("createAt", "desc");
  const query_app = appsRef.orderBy("createAt", "desc");
  const query_alumni = alumniRef.orderBy("createAt", "desc");
  const query_ani = aniRef.orderBy("createAt", "desc");
  const query_mem = memRef.orderBy("createAt", "desc");
  const query_spon = sponRef.orderBy("createAt", "desc");
  const query_premii = premiiRef.orderBy("createAt", "asc");

  const [blog] = useCollectionData(query, { idField: "id" });
  const [apps] = useCollectionData(query_app, { idField: "id" });
  const [alumni] = useCollectionData(query_alumni, { idField: "id" });
  const [ani] = useCollectionData(query_ani, { idField: "id" });
  const [mem] = useCollectionData(query_mem, { idField: "id" });
  const [spon] = useCollectionData(query_spon, { idField: "id" });
  const [premii] = useCollectionData(query_premii, { idField: "id" });

  const [plaintext, setPlainText] = useState();
  const [titlu, setTitlu] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [imgs, setImgs] = useState();
  const [length, setL] = useState();

  const deleteblog = async (e) => {
    await blogRef

      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  const deleteapp = async (e) => {
    await appsRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };
  const delete_alumni = async (e) => {
    await alumniRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  const upload_blog = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      titlu,
      uid: uid,
      fb,
      insta,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let texts = plaintext.split("<next line>");

    for (
      let scapa_copiii_din_pivnita = 0;
      scapa_copiii_din_pivnita < length;
      scapa_copiii_din_pivnita++
    ) {
      try {
        added[`img${scapa_copiii_din_pivnita}`] =
          imgs[`img${scapa_copiii_din_pivnita}`];
      } catch (error) {
        alert(error);
        return;
      }
    }
    // for (
    //   let scapa_copiii_din_pivnita = 0;
    //   scapa_copiii_din_pivnita < texts.length;
    //   scapa_copiii_din_pivnita++
    // ) {
    //   try {
    //     if (texts[scapa_copiii_din_pivnita] != "")
    //       added[`text${scapa_copiii_din_pivnita}`] =
    //         texts[scapa_copiii_din_pivnita];
    //     else {
    //       alert("Nu ai introdus nici un text!");
    //       return;
    //     }
    //   } catch (error) {
    //     alert(error);
    //     return;
    //   }
    // }
    // if (imgs != []) {
    //   added.imgs = imgs;
    // } else {
    //   alert("Nu ai introdus nici un paragraf!");
    //   return;
    // }
    if (texts != []) {
      added.texts = texts;
    } else {
      alert("Nu ai introdus nici un paragraf!");
      return;
    }

    if (titlu == "") {
      alert("Nu ai introdus nici un titlu!");
      return;
    }
    if (fb == "") {
      alert("Nu ai introdus nici un link de facebook!");
      return;
    }
    if (insta == "") {
      alert("Nu ai introdus nici un link de insta!");
      return;
    }

    await blogRef
      .add(added)
      .then((res) => {
        alert("Postare adaugata");
      })
      .catch((err) => alert(err));
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const uploadimg = async (e) => {
    let obj = {};
    setL(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      new Compressor(file, {
        quality: 0.8,
        success: (compressedResult) => {
          getBase64(compressedResult)
            .then((result) => {
              // setImgs({ ...imgs, i: result });
              obj[`img${i}`] = result;
              setImgs(obj);
            })
            .catch((err) => {
              alert(err);
            });
        },
      });
    }
    // if (file.size * e.target.files.length > 1048487 / e.target.files.length) {
    //   alert("total img e prea mare si trb sa o schimbi")
    //   return
    // }
  };

  // -----------------APPS-------------------
  const [descriere, setDescriere] = useState("");
  const [cod_qr, setCodqr] = useState("");
  const [img, setImg] = useState("");
  const [titlu_app, setTitluApp] = useState("");
  const [link, setLink] = useState("");
  const [link_text, setLinkText] = useState("");

  const submit_app = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      titlu: titlu_app,
      uid: uid,
      descriere,
      link,
      link_text,
      cod_qr,
      img,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await appsRef
      .add(added)
      .then((res) => {
        alert("app adaugat");
      })
      .catch((err) => alert(err));
  };

  //----------------ALUMNI------------------
  const [anistate, setAni] = useState("");
  const [nume_alumni, setAlumninume] = useState("");
  const [detalii_alumni, setdetaliialumni] = useState("");
  const [poza_alumni, setPozealumni] = useState("");
  const [text_alumni, setTextalumni] = useState("");

  const upload_alumni = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    let added = {
      id,
      nume: nume_alumni,
      uid: uid,
      ani: anistate,
      detalii: detalii_alumni,
      poza: poza_alumni,
      text: text_alumni,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await alumniRef
      .add(added)
      .then((res) => {
        alert("alumni adaugat");
      })
      .catch((err) => alert(err));
  };
  //--------------ANI-------------
  const [ani_efectiv, setAniEfectiv] = useState("");

  const add_ani = async (e) => {
    e.preventDefault();
    let added = {
      ani: ani_efectiv,
      id,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await aniRef
      .add(added)
      .then((res) => {
        alert("ani adaugata");
      })
      .catch((err) => alert(err));
  };

  const delete_year = async (e) => {
    await aniRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  //--------------MEMBERS----------------
  const [ani_mem, setanimem] = useState("");
  const [nume_mem, setnumemem] = useState("");
  const [detalii_mem, setdetaliimem] = useState("");
  const [poza_mem, setpozamem] = useState("");

  const upload_mem = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    let added = {
      id,
      nume: nume_mem,
      uid: uid,
      ani: ani_mem,
      detalii: detalii_mem,
      poza: poza_mem,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await memRef
      .add(added)
      .then((res) => {
        alert("Postare adaugata");
      })
      .catch((err) => alert(err));
  };

  const delete_mem = async (e) => {
    await memRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };
  //-------------premii---------------
  const [img_premii, setImgPremii] = useState("");
  const [text_premii, setTextPremii] = useState("");
  const [an_premii, setPremiian] = useState("");

  const upload_premii = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    let added = {
      id,
      an: an_premii,
      img: img_premii,
      text: text_premii,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await premiiRef
      .add(added)
      .then((res) => {
        alert("premiu adaugat");
      })
      .catch((err) => alert(err));
  };

  //--------------sponsori-------------
  const [logo, setlogo] = useState("");
  const upload_sponsor = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    let added = {
      id,
      uid,
      logo,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await sponRef
      .add(added)
      .then((res) => {
        alert("sponsor adaugat");
      })
      .catch((err) => alert(err));
  };

  const delete_sponsor = async (e) => {
    await sponRef
      .where("id", "==", e)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              alert("sters cu succes");
              return;
            })
            .catch(function (error) {
              alert(error);
              return;
            });
        });
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };

  const [clasa, setClasa] = useState("fas fa-caret-right");
  const [h, setH] = useState("0");

  function more() {
    if (clasa === "fas fa-caret-up") {
      setClasa("fas fa-caret-right");
      setH("0");
    } else {
      setClasa("fas fa-caret-up");
      setH("auto");
    }
  }

  const [clasa2, setClasa2] = useState("fas fa-caret-right");
  const [h2, setH2] = useState("0");

  function more2() {
    if (clasa2 === "fas fa-caret-up") {
      setClasa2("fas fa-caret-right");
      setH2("0");
    } else {
      setClasa2("fas fa-caret-up");
      setH2("auto");
    }
  }
  const [clasa3, setClasa3] = useState("fas fa-caret-right");
  const [h3, setH3] = useState("0");

  function more3() {
    if (clasa3 === "fas fa-caret-up") {
      setClasa3("fas fa-caret-right");
      setH3("0");
    } else {
      setClasa3("fas fa-caret-up");
      setH3("auto");
    }
  }

  const [clasa4, setClasa4] = useState("fas fa-caret-right");
  const [h4, setH4] = useState("0");

  function more4() {
    if (clasa4 === "fas fa-caret-up") {
      setClasa4("fas fa-caret-right");
      setH4("0");
    } else {
      setClasa4("fas fa-caret-up");
      setH4("auto");
    }
  }

  const [clasa5, setClasa5] = useState("fas fa-caret-right");
  const [h5, setH5] = useState("0");

  function more5() {
    if (clasa5 === "fas fa-caret-up") {
      setClasa5("fas fa-caret-right");
      setH5("0");
    } else {
      setClasa5("fas fa-caret-up");
      setH5("auto");
    }
  }
  const [clasa6, setClasa6] = useState("fas fa-caret-right");
  const [h6, setH6] = useState("0");

  function more6() {
    if (clasa6 === "fas fa-caret-up") {
      setClasa6("fas fa-caret-right");
      setH6("0");
    } else {
      setClasa6("fas fa-caret-up");
      setH6("auto");
    }
  }
  const [clasa7, setClasa7] = useState("fas fa-caret-right");
  const [h7, setH7] = useState("0");

  function more7() {
    if (clasa7 === "fas fa-caret-up") {
      setClasa7("fas fa-caret-right");
      setH7("0");
    } else {
      setClasa7("fas fa-caret-up");
      setH7("auto");
    }
  }

  return (
    <>
      <div className="admin">
        {user && user.uid == "G41BaSVvR2P146qD7C1QJvg1XWR2" ? (
          <>
            <div className="logged">
              <div className="blogs_part">
                <div className="out">
                  <button
                    className="button"
                    onClick={() => {
                      auth.signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
                <form onSubmit={upload_blog}>
                  <h1>FOR BLOG</h1>
                  <h4 className="info">Poti alege mai multe poze</h4>
                  <input
                    required
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => uploadimg(e)}
                  />
                  <h4 className="info">
                    Pentru a desparti textul in paragrafe adauga intre 2
                    paragrafe &lt;next line&gt; si de preferat sa aiba spatiu
                    intre ce este inainte si dupa{" "}
                  </h4>
                  <textarea
                    required
                    placeholder="paragrafe"
                    type="text"
                    onChange={(e) => {
                      setPlainText(e.target.value);
                    }}
                  />
                  <textarea
                    required
                    placeholder="titlu"
                    onChange={(e) => setTitlu(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de facebook precum:
                    https://m.facebook.com/story.php?story_fbid=888623485487024&id=100030181425201
                  </h4>
                  <input
                    type="url"
                    required
                    placeholder="fb"
                    onChange={(e) => setFb(e.target.value)}
                  />
                  <h4 className="info">
                    Trebuie sa fie un link de instagram precum:
                    https://www.instagram.com/p/CmHTUnPN8ne/?igshid=YmMyMTA2M2Y=
                  </h4>
                  <input
                    type="url"
                    required
                    placeholder="insta"
                    onChange={(e) => setInsta(e.target.value)}
                  />
                  <button className="button" type="submit">
                    send
                  </button>
                </form>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more}>
                      <i className={clasa}></i>
                      <span id="STEM">Arată toti postarile</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h, transition: "0.5s ease-in-out" }}
                    >
                      <div className="blog">
                        {blog &&
                          blog.map((bl) => {
                            return (
                              <Post
                                deleted={() => deleteblog(bl.id)}
                                dalay={300}
                                data2={"fade-down"}
                                ajutor={true}
                                key={Math.random() * 92342423}
                                data="fade-right"
                                link={`/blog/${bl.id}`}
                                poza={bl.img0}
                                titlu={bl.titlu}
                                text_scurt={
                                  bl.texts[0].length > 200
                                    ? bl.texts[0].slice(0, 200) + " ..."
                                    : bl.texts[0]
                                }
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="apps_part">
                <h1>FOR APPS</h1>
                <form onSubmit={submit_app}>
                  <h4 className="info">Set the img.</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setImg(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <h4 className="info">Set the Qr code</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.8,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setCodqr(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <input
                    type="url"
                    placeholder="link"
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="link text"
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                  <textarea
                    placeholder="descriere"
                    onChange={(e) => setDescriere(e.target.value)}
                  />
                  <textarea
                    placeholder="titlu"
                    onChange={(e) => setTitluApp(e.target.value)}
                  />
                  <button type="submit" className="button">
                    Submit
                  </button>
                </form>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more2}>
                      <i className={clasa2}></i>
                      <span id="STEM">Arată toti apps</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h2, transition: "0.5s ease-in-out" }}
                    >
                      <div className="apps">
                        {apps &&
                          apps.map((app) => (
                            <>
                              <div className="app">
                                <div className="top">
                                  <div className="img">
                                    <img src={app.img} alt="" />
                                  </div>
                                  <div className="txt">
                                    <div className="title">
                                      <h1>{app.titlu}</h1>
                                      <div className="linie"></div>
                                    </div>
                                    <div className="text">
                                      <div className="linie_vert"></div>
                                      <p>{app.descriere}</p>
                                    </div>
                                    <button
                                      className="button"
                                      style={{
                                        width: "100%",
                                        margin: "30px 0",
                                      }}
                                      onClick={() => deleteapp(app.id)}
                                    >
                                      delete app
                                    </button>
                                  </div>
                                </div>

                                <a
                                  href={app.link}
                                  target="_blank"
                                  className="button"
                                >
                                  {app.link_text}
                                </a>
                                {app.cod_qr && (
                                  <div className="qr_cont">
                                    <img
                                      src={app.cod_qr}
                                      className="qr"
                                      alt=""
                                    />
                                  </div>
                                )}
                                <div className="linie_sep"></div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="ani_part">
                <h1>FOR ANI</h1>
                <form onSubmit={add_ani}>
                  <h4 className="info">
                    Anul se va scrie in formatul an-an, ex: 2021-2022
                  </h4>{" "}
                  <input
                    placeholder="adauga anul curent"
                    type="text"
                    onChange={(e) => setAniEfectiv(e.target.value)}
                  />
                  <button className="button" type="submit">
                    submit
                  </button>
                </form>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more3}>
                      <i className={clasa3}></i>
                      <span id="STEM">Arată toti anii</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h3, transition: "0.5s ease-in-out" }}
                    >
                      <div
                        style={{
                          width: "100vw",
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        {ani &&
                          ani.map((an) => {
                            return (
                              <>
                                <div
                                  style={{
                                    width: "max-content",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: "20px 30px",
                                  }}
                                >
                                  <h1 style={{ color: "white" }}>{an.ani}</h1>
                                  <button
                                    className="button"
                                    onClick={() => delete_year(an.id)}
                                  >
                                    delete year
                                  </button>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="alumni_part">
                <h1>FOR ALUMNI</h1>
                <form onSubmit={upload_alumni}>
                  <select onChange={(e) => setAni(e.target.value)}>
                    <option value="null">Alege un an</option>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    placeholder="nume"
                    onChange={(e) => setAlumninume(e.target.value)}
                  />
                  <h4 className="info">
                    Sa se scrie facultatea terminata/actuala
                  </h4>
                  <input
                    type="text"
                    placeholder="detalii"
                    onChange={(e) => setdetaliialumni(e.target.value)}
                  />
                  <textarea
                    placeholder="text"
                    onChange={(e) => setTextalumni(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setPozealumni(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <button type="submit" className="button">
                    add alumni
                  </button>
                </form>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more4}>
                      <i className={clasa4}></i>
                      <span id="STEM">Arată toti alumnii</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h4, transition: "0.5s ease-in-out" }}
                    >
                      {ani &&
                        ani.map((ani) => (
                          <Generatie
                            no={true}
                            years={ani.ani}
                            team={false}
                            key={ani.id}
                            persoane={[
                              alumni &&
                                alumni.map((alumni) => {
                                  if (alumni.ani == ani.ani)
                                    return {
                                      key: alumni.id,
                                      no: true,
                                      id: alumni.id,
                                      delete_this: delete_alumni,
                                      img: alumni.poza,
                                      nume: alumni.nume,
                                      faculta: alumni.detalii,
                                      text: alumni.text,
                                    };
                                }),
                            ]}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="members_part">
                <h1>FOR MEMBERS</h1>
                <form onSubmit={upload_mem}>
                  <select onChange={(e) => setanimem(e.target.value)}>
                    {ani &&
                      ani.map((an) => {
                        return <option value={an.ani}>{an.ani}</option>;
                      })}
                  </select>
                  <input
                    type="text"
                    placeholder="nume"
                    onChange={(e) => setnumemem(e.target.value)}
                  />
                  <h4 className="info">
                    Sa se scrie departamentul main din care face parte
                  </h4>
                  <input
                    type="text"
                    placeholder="detalii"
                    onChange={(e) => setdetaliimem(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setpozamem(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <button type="submit" className="button">
                    add member
                  </button>
                </form>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more5}>
                      <i className={clasa5}></i>
                      <span id="STEM">Arată toti alumnii</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h5, transition: "0.5s ease-in-out" }}
                    >
                      {ani &&
                        ani.map((ani) => (
                          <Generatie
                            no={true}
                            years={ani.ani}
                            team={true}
                            key={ani.id}
                            persoane={[
                              mem &&
                                mem.map((alumni) => {
                                  if (alumni.ani == ani.ani)
                                    return {
                                      key: alumni.id,
                                      no: true,
                                      id: alumni.id,
                                      delete_this: delete_mem,
                                      img: alumni.poza,
                                      nume: alumni.nume,
                                      faculta: alumni.detalii,
                                    };
                                }),
                            ]}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="sponsor_part">
                <h1>FOR SPONSORS</h1>
                <form onSubmit={upload_sponsor}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setlogo(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />
                  <button type="submit" className="button">
                    add_sponsor
                  </button>
                </form>
                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more6}>
                      <i className={clasa6}></i>
                      <span id="STEM">Arată toti sponsorii</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h6, transition: "0.5s ease-in-out" }}
                    >
                      <div className="sponsors">
                        {spon &&
                          spon.map((sp) => (
                            <div>
                              <img src={sp.logo} />
                              <button
                                className="button"
                                onClick={() => delete_sponsor(sp.id)}
                              >
                                delete this sponsor
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="premii_part">
                <h1>FOR PREMII</h1>
                <form onSubmit={upload_premii}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      new Compressor(file, {
                        quality: 0.5,
                        success: (compressedResult) => {
                          getBase64(compressedResult)
                            .then((result) => {
                              setImgPremii(result);
                            })
                            .catch((err) => {
                              alert(err);
                              return;
                            });
                        },
                      });
                    }}
                  />

                  <input
                    type="number"
                    placeholder="an"
                    onChange={(e) => setPremiian(e.target.value)}
                  />
                  <textarea
                    placeholder="text"
                    onChange={(e) => setTextPremii(e.target.value)}
                  />
                  <button type="submit" className="button">
                    submit
                  </button>
                </form>

                <div className="stemText">
                  <div className="more">
                    <div className="press" onClick={more7}>
                      <i className={clasa7}></i>
                      <span id="STEM">Arată toate premiile</span>
                    </div>
                    <div
                      className="hide"
                      style={{ height: h7, transition: "0.5s ease-in-out" }}
                    >
                      <div className="scrollcnt">
                        <div className="loc_de_premii">
                          <h1>Premii</h1>
                          <div className="coca"></div>
                          <h2>Since 2017</h2>
                        </div>
                        <ScrollContainer className="scc">
                          <div className="poate">
                            <div className="space"></div>
                            {premii &&
                              premii.map((premiu) => (
                                <Card
                                  key={premiu.id}
                                  an={premiu.an}
                                  text={premiu.text}
                                  image={premiu.img}
                                />
                              ))}
                          </div>
                        </ScrollContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login">
              <div className="title">
                <h1>
                  Pentru a avea acces pe aceasta pagina trebuie sa te loghezi cu
                  contul de google al echipei{" "}
                  <span style={{ color: "#6ef188" }}>Thobor</span>{" "}
                </h1>
                <div className="linie"></div>
              </div>
              {user && user.uid != "G41BaSVvR2P146qD7C1QJvg1XWR2" && (
                <h2 className="error_cont">
                  Contul selectat nu e cel al echipei de robotica Thobor
                </h2>
              )}
              <button className="button" onClick={signingoagle}>
                Sign in with google
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Admin;
