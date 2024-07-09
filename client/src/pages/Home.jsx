/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem.jsx";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log("offer listings does not fetched", error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?rent=true&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log("Rent listings does not fetched", error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?sale=true&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log("Sale listings does not fetched", error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className=" text-3xl text-slate-700 font-bold ">
        Welcome to Bharat Estate your <span className="text-slate-500">perfect</span>
          <br /> Place Awaits!
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm ">
        Explore a World of Properties with Bharat Estate.
          <br />
          Find Your Perfect Match Today
        </div>

        <Link
          to={"/search"}
          className="text-sm sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let&apos;s get started...
        </Link>
      </div>

      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] "
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>



      {/* listing results  offer , sale and rent */}

      <div className="max-w-6xl mx-auto p-3  flex flex-col  gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Resent offers</h2>
              <Link to={"/search?offer=true"} 
              className="text-sm text-blue-800 hover:underline"
              >Show more offers </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Resent places for rent</h2>
              <Link to={"/search?rent=true"} 
              className="text-sm text-blue-800 hover:underline"
              >Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Resent places for sales</h2>
              <Link to={"/search?sale=true"} 
              className="text-sm text-blue-800 hover:underline"
              >Show more places for sale</Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
