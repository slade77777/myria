import React, { useState } from 'react';
import NodeIcon from '../../../components/icons/NodeIcon';
import AppleIcon from '../../../components/icons/node/AppleIcon';
import WindowIcon from '../../../components/icons/node/WindowIcon';
import LinuxIcon from '../../../components/icons/node/LinuxIcon';
import SupportIcon from '../../../components/icons/SupportIcon';
import useNodeLicense from '../../../hooks/useNodeLicense';
import NodeLayout from '../../../components/nodes/dashboard/NodeLayout';
import NodesModal from '../../../components/nodes/dashboard/NodesModal';

const Node = () => {
  const { data } = useNodeLicense();
  const [showFullNode, setShowNode] = useState(false);

  return (
    <NodeLayout>
      <NodesModal open={showFullNode} onClose={() => setShowNode(false)} />
      <p className="text-3xl text-white">Setup Myria Node</p>
      <div className="bg-base/3 border-base/5 mt-6 flex w-fit flex-row items-center gap-4 rounded-xl border-2 py-4 pl-6 pr-12">
        <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
          <NodeIcon className="h-4 w-4 text-black" />
        </div>
        <p className="text-base/9 font-medium">
          You have <span className="text-primary/6">{data?.length}</span> Myria Node Licenses
        </p>
      </div>
      <div className="mt-8 flex flex-col">
        <div>
          <p className="text-2xl font-medium text-white">Run your Nodes with Myria</p>
          <p className="text-base/9 mt-4">
            By clicking <span className="font-semibold text-white">Get Started</span> you’ll be able
            to begin the operation of all your Myria Node license(s). At present, there is no
            requirement for you as the user to download and operate Myria Node software.
          </p>
          <div
            className="bg-primary/6 rounded-xl py-4 px-8 my-8 w-fit cursor-pointer"
            onClick={() => setShowNode(true)}>
            <p className="font-bold text-black">GET STARTED</p>
          </div>
          <div className="flex flex-row gap-4 mt-12">
            <p className="text-2xl font-medium text-white">Run Myria Node software</p>
            <p className="text-brand-yellow rounded-full bg-[#2B4C63] p-2 text-xs font-medium leading-[1.3] text-brand-light-blue">
              Comming soon
            </p>
          </div>
          <p className="text-base/9 mt-4">
            In future, you’ll receive an update from Myria on how to download and operate the Myria
            Node software. For now, simply follow Get Started above.
          </p>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col items-center w-fit mt-8">
              <div className="border-gray/5 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
                <AppleIcon fill="#6B7280" />
                <p className="text-gray/5">DOWNLOAD FOR MAC</p>
              </div>
              <p className="mt-2 text-gray/5">Mac OSX or higher</p>
            </div>
            <div className="flex flex-col items-center w-fit mt-8">
              <div className="border-gray/5 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
                <WindowIcon fill="#6B7280" />
                <p className="text-gray/5">DOWNLOAD FOR WINDOWS</p>
              </div>
              <p className="mt-2 text-gray/5">Windows 10 or higher</p>
            </div>
            <div className="flex flex-col items-center w-fit mt-8">
              <div className="border-gray/5 mt-4 flex h-14 w-fit flex-row items-center justify-center gap-4 rounded-2xl border-2 w-72">
                <LinuxIcon fill="#6B7280" />
                <p className="text-gray/5">DOWNLOAD FOR UBUNTU</p>
              </div>
              <p className="mt-2 text-gray/5">Ubuntu (Headless)</p>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <p className="text-base/9 mt-4">
            If you’d like to know more, then please check out our support pages.
          </p>
          <div className="bg-base/3 mt-6 rounded-xl py-6 pl-6 w-64">
            <div className="bg-blue/6 flex h-8 w-8 items-center justify-center rounded-full">
              <SupportIcon />
            </div>
            <p className="mt-4">Node Support</p>
          </div>
          {/*<p className="text-white font-bold text-2xl mt-8">Get Online Help</p>*/}
          {/*<div className="flex flex-row gap-6 h-12 mt-4">*/}
          {/*  <TwitterIcon />*/}
          {/*  <MediumIcon />*/}
          {/*  <InstagramIcon />*/}
          {/*</div>*/}
        </div>
      </div>
    </NodeLayout>
  );
};

export default Node;
