import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tooltip } from '../index';

export default {
  title: 'Tooltips',
  component: Tooltip,
  argTypes: {
    position: {
      options: [
        'topLeft',
        'topRight',
        'topCenter',
        'bottomLeft',
        'bottomRight',
        'bottomCenter',
        'leftTop',
        'leftBottom',
        'leftCenter',
        'rightTop',
        'rightBottom',
        'rightCenter'
      ],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className="mt-[200px] ml-[300px]">
    <Tooltip {...args}>
      <button>Hover me</button>
    </Tooltip>
  </div>
);

export const DefaultTooltip = Template.bind({});

DefaultTooltip.args = {
  position: 'topRight',
  content:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
};
