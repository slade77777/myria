import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link } from '../index';

export default {
  title: 'Links',
  component: Link
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const DefaultLink = Template.bind({});

DefaultLink.args = {
  disabled: false,
  children: 'Myria',
  href: '/',
  underline: false
};
