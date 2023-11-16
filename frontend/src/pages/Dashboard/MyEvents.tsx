import image1 from "../../assets/will-breen-BZ5ek7LSoYY-unsplash.jpg";
import image2 from "../../assets/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg";
import image3 from "../../assets/chuttersnap-aEnH4hJ_Mrs-unsplash.jpg";
import image4 from "../../assets/samantha-gades-fIHozNWfcvs-unsplash.jpg";
import image5 from "../../assets/delaney-van-JYVKaxAlp4A-unsplash.jpg";

type Props = {};

const MyEvents = (props: Props) => {
  return (
    <div className="my-8 w-10/12">
      <div className="font-bold text-2xl">Transactions</div>
      <div className="overflow-x-auto">
        <table className="table table-xs lg:table-md">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEvents;
