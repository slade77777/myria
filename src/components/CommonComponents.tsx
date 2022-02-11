import React from 'react';
import CardWithIcon from './CardWithIcon';
import Careers from './Careers/Careers';
import GetInTouch from './GetInTouch';
import StarIcon from './icons/StarIcon';
import Input from './Input';
import Textarea from './Textarea';

const CommonComponents: React.FC = () => {
  return (
    <div className="grid gap-10 p-10 text-white justify-items-start bg-brand-deep-blue">
      <p className="heading-lg md:heading-massive">
        Massive Heading Brutal Type Extra Bold 60px 115% Line Spacing
      </p>
      <p className="heading-md md:heading-lg">
        Large Heading Brutal Type Extra Bold 40px 125% Line Spacing
      </p>
      <p className="heading-md">Medium Heading Brutal Type Extra Bold 32px 120% Line Spacing </p>
      <p className="heading-sm">
        Small Heading Brutal Type 28px Medium 130% Line Spacing Become part of the community of
        pioneers building the future of the metaverse{' '}
      </p>
      <p className="body-lg">
        Body Large Brutal Type 24px Regular 150% Line spacing The Myria Network is supported by
        users, just like you, who operate Myria Nodes from their home computers. By buying a license
        to operate a Myria Node, you open up opportunities to receive rewards for your contribution
        to the network.
      </p>
      <p className="body">
        Body Regular Brutal Type 20px Regular 150% Line spacing Gluten-free squid man braid, mlkshk
        offal bespoke lomo biodiesel direct trade. Hoodie pop-up ethical subway tile, pok pok
        adaptogen thundercats hexagon cold-pressed man bun hell of.{' '}
      </p>
      <p className="body-sm">
        Body Small Brutal Type 18px Regular 150% Line spacing Gluten-free squid man braid, mlkshk
        offal bespoke lomo biodiesel direct trade. Hoodie pop-up ethical subway tile, pok pok
        adaptogen thundercats hexagon cold-pressed man bun hell of.{' '}
      </p>
      <p className="caption">Caption Brutal Type EXTRABOLD 14px 125% Line Spacing All Caps</p>
      <button className=" btn-lg btn-primary">Primary button</button>
      <button className=" btn-sm btn-primary">SIGN UP</button>
      <button className=" btn-lg btn-secondary">Hello world</button>
      <button className=" btn-sm btn-secondary">Log in</button>
      <button className=" btn-lg btn-white">Hello world</button>
      <button className=" btn-lg btn-light-blue">Hello world</button>
      <a href="#" className="link">
        Hello world
      </a>
      <Input error={true} placeholder="johndoe@gmail.com" />
      <Textarea placeholder="johndoe@gmail.com" />
      <GetInTouch />
      <CardWithIcon
        icon={
          <div className="w-[64px]">
            <StarIcon />
          </div>
        }>
        <h2 className="heading-sm">Myria ecosystem fund</h2>
      </CardWithIcon>
      <Careers />
    </div>
  );
};

export default CommonComponents;
