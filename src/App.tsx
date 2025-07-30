import { useEffect, useState } from "react";
import { ComboboxDemo } from "./components/ui/combobox";
import { Button } from "./components/ui/button";
import { PropertyForm } from "./components/PropertyForm";
import axios from "axios";

interface typesType {
  propertyName: string;
  propertyLocation: string;
  propertyInfo: string;
  propertyPrice: number;
}

const App = () => {
  const [types, setTypes] = useState<typesType[]>([
    {
      propertyName: "Plot",
      propertyLocation: "Pune",
      propertyInfo: "A large-pst of land available for development",
      propertyPrice: 250000,
    },
    
  ]);
  const [filteredTypes, setFilteredTypes] = useState<typesType[]>([
    {
      propertyName: "",
      propertyLocation: "",
      propertyInfo: "",
      propertyPrice: 0,
    },
  ]);
  const [curPropertyView, setCurPropertyView] = useState("");

  useEffect(()=>{
    async function getTypes(){
        const property = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getall/property`);
        console.log(property.data.result);
        property.data.result.map((cur:typesType)=>{
            setFilteredTypes((prev)=>[...prev,cur])
            setTypes((prev)=>[...prev,cur])
        })
    }
    getTypes()
  },[])

  return (
    <main className="max-w-[1400px] mx-auto border border-black py-2 px-5 md:px-9">
      <div className="w-full border text-center mt-3">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Mini Property Listing Dashboard
        </h1>
      </div>
      <div className="w-full mt-14 flex flex-col gap-5 md:">
        <span className="text-md font-sans">Property Listing</span>
        <ComboboxDemo types={types} setFilteredTypes={setFilteredTypes} />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-[50px] rounded-md px-2 py-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] h-[450px] overflow-x-hidden overflow-y-scroll">
        {filteredTypes?.map((cur, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 h-[200px] bg-slate-50 p-3 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              <p className="text-2xl font-semibold">{cur.propertyName}</p>
              <p className="">{cur.propertyLocation}</p>
              <p className="border border-black h-[56px] overflow-hidden px-1">
                {cur.propertyInfo}
              </p>
              <div className="flex justify-between items-center">
                <p className="">${cur.propertyPrice}</p>
                <Button onClick={() => setCurPropertyView(cur.propertyName)}>
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </section>

      <section className=" mt-[70px] grid grid-cols-1 md:grid-cols-2 gap-4  px-1 py-2 md:py-[50px] md:px-[50px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <PropertyForm setFilteredTypes={setFilteredTypes}/>
        <div className="">
          {curPropertyView == ""
            ? <p className="text-center">select any property</p> 
            : types.map((cur,index) => {
              if(cur.propertyName === curPropertyView){
                    return (
                      <div key={index} className="relative rounded-md md:px-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    <p className="text-2xl font-bold text-center">
                      View Details
                    </p>
                    <div className="flex gap-4">
                      <div className="w-[50%] mt-5">
                        <img src="./property-image.jpg" alt="property image" />
                      </div>
                      <div className="mt-5">
                        <p className="text-2xl font-bold">{cur.propertyName}</p>
                        <div className="">
                          <span className="font-bold">Location: </span>{cur.propertyLocation}
                        </div>
                        <div className="">
                          <span className="font-semibold">Price: </span>
                          <span className="">${cur.propertyPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 ">
                      <p className="text-md mb-2">Property Info</p>
                      <p className="text-sm sm:text-md rounded-sm  h-[140px] p-2 overflow-x-hidden overflow-y-scroll shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        {cur.propertyInfo}
                      </p>
                    </div>
                  </div>
                    );
                  }
                  
              })}
        </div>
      </section>
    </main>
  );
};

export default App;
