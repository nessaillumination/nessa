
import RecoExSec1 from './RecoExSec1';
import RecoExSec2 from './RecoExSec2';

const RecognizeEx = () => {
  return (
    <div className="w-full h-fit ">
      <div className="w-full h-fit px-[5vw] py-[5vw] flex flex-col items-center justify-center relative">
        <div className=" text-4xl font-semibold leading-snug text-center text-black z-[2] relative">
          Recognized
          <span className="text-blue-500"> Excellence</span>
        </div>
        <div className="flex relative shrink-0 mt-9 h-2.5 bg-[#b3d6f6] rounded-[50px] w-[51px]" />
      </div>
      <div className="w-full  flex max-md:flex-col ">
        <div className="w-1/2 max-md:w-full py-[50px] bg-[#EEF7FF]">
          <div className=" text-2xl font-semibold leading-snug text-center text-black z-[2] relative">
            Nessa in
            <span className="text-blue-500"> News</span>
          </div>
          <RecoExSec1 />  
          
        </div>
        <div className="w-1/2 max-md:w-full py-[50px]  ">
          <div className=" text-2xl font-semibold leading-snug text-center text-black z-[2] relative">
            Awards &<span className="text-blue-500"> Recognition</span>
          </div>
          <RecoExSec2 />
        </div>
      </div>
    </div>
  );
};

export default RecognizeEx;
