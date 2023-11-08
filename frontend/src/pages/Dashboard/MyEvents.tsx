import image1 from "../../assets/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "../../assets/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "../../assets/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "../../assets/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "../../assets/delaney-van-JYVKaxAlp4A-unsplash.jpg";

type Props = {};

const MyEvents = (props: Props) => {
  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image1} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Merchandise Drop</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                5.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image2} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Web3 Conference</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                10.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image3} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">INTMAX Buffer</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                2.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image4} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Base Street Party</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                1.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image5} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Solana Tradefair</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                3.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="card w-80 sm:w-[28rem] md:w-80 bg-base-100 shadow-xl">
          <figure>
            <img src={image1} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Merchandise Drop</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-between items-center">
              <button className="btn btn-neutral">Paid</button>
              <h3 className="font-bold text-lg">
                5.0 <span>CHIX</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
