import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";

const GetInTouch: React.FC = () => {
  return (
    <div className="rounded-[20px] bg-[url('/images/get-in-touch/panel.png')] bg-cover bg-center md:py-[64px] p-[32px] w-full">
      <h2 className="text-center heading-sm md:heading-md">Get in touch</h2>
      <div className="grid md:grid-cols-2 gap-[32px] gap-x-[28px] mt-[48px]">
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Subject" containerClassName="md:col-span-2" />
        <Textarea
          placeholder="Message"
          containerClassName="md:col-span-2"
          className="h-[180px]"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button className="btn-lg btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default GetInTouch;
