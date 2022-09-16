import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../index';

const StartIcon = () => {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.2525 5.21255C15.7725 3.58505 14.415 2.22755 12.7875 1.74755C11.55 1.38755 10.695 1.41755 10.1025 1.86005C9.39 2.39255 9.3075 3.35255 9.3075 4.03505V5.90255C9.3075 7.74755 10.1475 8.68505 11.7975 8.68505H13.95C14.625 8.68505 15.5925 8.60255 16.125 7.89005C16.5825 7.30505 16.62 6.45005 16.2525 5.21255Z"
        fill="currentColor"
      />
      <path
        d="M14.1825 10.02C13.9875 9.79499 13.7025 9.66749 13.41 9.66749H10.725C9.405 9.66749 8.3325 8.59499 8.3325 7.27499V4.58999C8.3325 4.29749 8.205 4.01249 7.98 3.81749C7.7625 3.62249 7.4625 3.53249 7.1775 3.56999C5.415 3.79499 3.795 4.76249 2.7375 6.21749C1.6725 7.67999 1.2825 9.46499 1.62 11.25C2.1075 13.83 4.17 15.8925 6.7575 16.38C7.17 16.4625 7.5825 16.5 7.995 16.5C9.3525 16.5 10.665 16.08 11.7825 15.2625C13.2375 14.205 14.205 12.585 14.43 10.8225C14.4675 10.53 14.3775 10.2375 14.1825 10.02Z"
        fill="currentColor"
      />
    </svg>
  );
};

const EndIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default {
  title: 'Buttons',
  component: Button,
  argTypes: {
    variant: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tetiary', 'low-emphasis']
      }
    },
    size: {
      defaultValue: 'sm',
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl']
      }
    },
    children: {
      defaultValue: 'Button',
      control: {
        type: 'text'
      }
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    startIcon: {
      control: {
        disable: true
      }
    },
    endIcon: {
      control: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});

export const LeadingIconButton = Template.bind({});

LeadingIconButton.args = {
  startIcon: <StartIcon />
};

export const TrailingIconButton = Template.bind({});

TrailingIconButton.args = {
  endIcon: <EndIcon />
};

export const BothIconButton = Template.bind({});

BothIconButton.args = {
  startIcon: <StartIcon />,
  endIcon: <EndIcon />
};
