import React, { useMemo } from 'react';
import NodeLayout from '../../components/node/NodeLayout';
import useUserNodes from '../../hooks/useUserNodes';
import NodeIcon from '../../components/icons/NodeIcon';
import AppleIcon from '../../components/icons/node/AppleIcon';
import WindowIcon from '../../components/icons/node/WindowIcon';
import LinuxIcon from '../../components/icons/node/LinuxIcon';
import DashboardIcon from '../../components/icons/DashboardIcon';
import VPSIcon from '../../components/icons/node/VPSIcon';
import TwitterIcon from '../../components/icons/TwitterIcon';
import MediumIcon from '../../components/icons/MediumIcon';
import InstagramIcon from '../../components/icons/InstagramIcon';

const Node = () => {
  const { data } = useUserNodes();
  const successTrans = data?.filter((item) => item.purchaseStatus === 'SUCCESSFUL');

  const totalNode = useMemo(() => {
    let total = 0;
    successTrans.map((transactions) => {
      total += transactions.nodes.length;
    });
    return total;
  }, [successTrans]);

  return (
    <NodeLayout>
      <p className="text-3xl text-white">Setup the Founder’s Node</p>
      <div className="bg-base/3 border-base/5 mt-6 flex w-fit flex-row items-center gap-4 rounded-xl border-2 py-4 pl-6 pr-12">
        <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
          <NodeIcon className="h-4 w-4 text-black" />
        </div>
        <p className="text-base/9 font-medium">
          You have <span className="text-primary/6">{totalNode}</span> Founder’s Node Licenses
        </p>
      </div>
      <div className="mt-8 flex flex-col md:flex-row md:gap-16">
        <div className="md:w-1/2">
          <p className="text-2xl font-medium text-white">Run on your Device</p>
          <p className="text-base/9 mt-4">
            The Myria Founder’s Node is compatible with PC/Mac/Ubuntu. Please download on a
            compatible device.
          </p>
          <p className="text-base/9 mt-4">
            You’ll have to run the Node for at least 5 hours without connection failures and switch
            it on and off manually.
          </p>
          <div className="flex flex-col items-center w-fit mt-8">
            <div className="border-primary/6 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
              <AppleIcon />
              <p className="text-primary/6">DOWNLOAD FOR MAC</p>
            </div>
            <p className="mt-2 text-base/9">Mac OSX or higher</p>
          </div>
          <div className="flex flex-col items-center w-fit mt-8">
            <div className="border-primary/6 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
              <WindowIcon />
              <p className="text-primary/6">DOWNLOAD FOR WINDOWS</p>
            </div>
            <p className="mt-2 text-base/9">Windows 10 or higher</p>
          </div>
          <div className="flex flex-col items-center w-fit mt-8">
            <div className="border-primary/6 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
              <LinuxIcon />
              <p className="text-primary/6">DOWNLOAD FOR UBUNTU</p>
            </div>
            <p className="mt-2 text-base/9">Ubuntu (Headless)</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="text-2xl font-medium text-white">Nodes Support</p>
          <p className="text-base/9 mt-4">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit.
          </p>
          <div className="bg-base/3 mt-6 rounded-xl py-6 pl-6 w-64">
            <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
              <DashboardIcon fill="black" />
            </div>
            <p className="mt-4">Software Operation</p>
          </div>
          <div className="bg-base/3 mt-6 rounded-xl py-6 pl-6 w-64">
            <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
              <VPSIcon />
            </div>
            <p className="mt-4">VPS Operation</p>
          </div>
          <p className="text-white font-bold text-2xl mt-8">Get Online Help</p>
          <div className="flex flex-row gap-6 h-12 mt-4">
            <TwitterIcon />
            <MediumIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>
    </NodeLayout>
  );
};

export default Node;
