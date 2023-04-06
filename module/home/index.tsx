import axios from "axios";
import "./index.scss";
import {useQuery} from "react-query";
import {Product} from "./component/Card";
import Image from "next/image";
import dimage from "@app/public/truck.png";
import word from "@app/public/world-plus.png";
import credit from "@app/public/credit-card-off.png";
import phone from "@app/public/phone-incoming.png";

export function Home(): JSX.Element {
  const {data} = useQuery("users", () =>
    axios.get("https://64197b16c152063412c30d87.mockapi.io/kmm")
  );
  return (
    <div className="homeisnumberone">
      <div className="driver-munber">
        <div className="viet">
          <Image src={dimage.src} alt="sdfd" width="40" height="40" />
          <div>
            <div>Free Shipping</div>
            <div>Tối đa 200.000</div>
          </div>
        </div>
        <div className="viet">
          <Image src={word.src} alt="sdfd" width="40" height="40" />
          <div>
            <div>Free Shipping</div>
            <div>Tối đa 200.000</div>
          </div>
        </div>
        <div className="viet">
          <Image src={credit.src} alt="sdfd" width="40" height="40" />
          <div>
            <div>Free Shipping</div>
            <div>Tối đa 200.000</div>
          </div>
        </div>
        <div className="viet">
          <Image src={phone.src} alt="sdfd" width="40" height="40" />
          <div>
            <div>Free Shipping</div>
            <div>Tối đa 200.000</div>
          </div>
        </div>
      </div>
      <div className="phone-munber">Điện thoại</div>
      <div className="home">
        {data?.data?.map((row: Product, index: number) => (
          <div key={index} className="table-Homestay">
            <div className="table-Homestay-version">
              <div className="flex-image">
                <Image
                  src={`data:image/png;base64,${row?.link}`}
                  alt=""
                  width="90"
                  height="90"
                />
              </div>

              <div>{row?.name}</div>
              <div>{row?.price}</div>
              <div>{row?.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
