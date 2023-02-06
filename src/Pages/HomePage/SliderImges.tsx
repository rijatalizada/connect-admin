import React, { useEffect, useState } from "react";
import Loading from "../../Components/Base/Loading";
import RemoveModal from "../../Components/Base/RemoveModal";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
const apiKey = import.meta.env.VITE_API_KEY;
const sliderImges = import.meta.env.VITE_GET_HEADERSLIDERS;
const removeSlider = import.meta.env.VITE_DELETE_SLIDER;
const createSlider = import.meta.env.VITE_CREATE_SLIDER;
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const SliderImges = () => {
  const [sliderImages, loading, error] = useFetch(apiKey + sliderImges);
  const { data, isOkay } = getCookie("admin");
  const [token, setToken] = useState<string>("");
  const [imageUpload, setImageUpload] = useState<File>();
  const [removingItemId, setRemovingItemId] = useState<number>(0);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);


  const uploadImg = () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `/HomeHeader/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateDb(url);
      })
    });
  };

  // useEffect(() => {
  //   listAll(imageListRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  const updateDb = async (url : string) => {
    const req = await fetch(apiKey + createSlider, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: "any",
        image: url,
        order: sliderImages.length + 1,
      }),
    });

    if(req.status === 201) {
      alert("Success");
      window.location.reload();
    }
  }

  const handleRemove = async () => {
    const response = await fetch(apiKey + removeSlider + removingItemId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      {isRemoving && (
        <RemoveModal
          handleRemove={handleRemove}
          setIsRemoving={setIsRemoving}
          type={"Slider Image"}
        />
      )}
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Home Slidders</p>
      </div>
      <div className="p-10 ">
        <input
          onChange={(e) => setImageUpload(e.target.files![0])}
          type="file"
          name=""
          id=""
          className="border-solid border-2 border-[green] p-2 rounded-md mr-2"
        />
        <button
        
          onClick={() => uploadImg()}
          className="mb-10 border-solid border-2 border-[orange] p-2 text-[orange] rounded-md"
        >
          Upload New
        </button>
        <div className="flex">
          {sliderImages.map((sliderImg: any) => {
            return (
              <div key={sliderImg.id} className="mx-4">
                <img src={sliderImg.image} alt="slider" className="w-[30rem]" />
                <button
                  onClick={() => {
                    setIsRemoving(true), setRemovingItemId(sliderImg.id);
                  }}
                  className="text-[red] cursor-pointer my-2"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SliderImges;
