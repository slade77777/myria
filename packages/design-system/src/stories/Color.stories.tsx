import { ComponentStory, ComponentMeta } from '@storybook/react';

const Colors = ({
  colors
}: {
  colors: {
    [name: string]: {
      [shade: string | number]: string;
    };
  };
}) => {
  return (
    <div>
      {Object.keys(colors).map((key) => (
        <div className="flex items-center space-x-10 space-y-10" key={key}>
          <div className="capitalize text-lg min-w-[150px]">{key}</div>
          <div className="flex items-center flex-wrap gap-4">
            {Object.entries(colors[key]).map((color) => {
              const [shade, value] = color;
              return (
                <div key={value} className="space-y-2 text-center font-mono">
                  <div
                    className="rounded-lg w-16 h-8"
                    style={{
                      background: value
                    }}
                  />
                  <p className="text-gray-100">{shade}</p>
                  <p className="text-gray-500">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Colors',
  component: Colors
} as ComponentMeta<typeof Colors>;

const Template: ComponentStory<typeof Colors> = (args) => <Colors {...args} />;

export const Theme = Template.bind({});

Theme.args = {
  colors: {
    primary: {
      'primary/1': '#181206',
      'primary/2': '#31250D',
      'primary/3': '#624A1A',
      'primary/4': '#936F27',
      'primary/5': '#C49434',
      'primary/6': '#F5B941',
      'primary/7': '#F7C767',
      'primary/8': '#F9D58D',
      'primary/9': '#FCEAC6',
      'primary/10': '#FEF8EC'
    },
    base: {
      'base/1': '#040B10',
      'base/2': '#050E15',
      'base/3': '#081824',
      'base/4': '#0B2231',
      'base/5': '#0F2D42',
      'base/6': '#0F2F45',
      'base/7': '#2B4C63',
      'base/8': '#5A7486',
      'base/9': '#A1AFBA',
      'base/10': '#E7EBEE'
    },
    blue: {
      'blue/1': '#071012',
      'blue/2': '#0F1F25',
      'blue/3': '#1F282D',
      'blue/4': '#5C7988',
      'blue/5': '#8BB5CC',
      'blue/6': '#9AC9E3',
      'blue/7': '#A4CEE6',
      'blue/8': '#B8D9EB',
      'blue/9': '#D7E9F4',
      'blue/10': '#F5FAFC'
    },
    teal: {
      'teal/1': '#021312',
      'teal/2': '#042723',
      'teal/3': '#084D47',
      'teal/4': '#0B746A',
      'teal/5': '#0F9A8E',
      'teal/6': '#13C1B1',
      'teal/7': '#42CDC1',
      'teal/8': '#5AD4C8',
      'teal/9': '#B8ECE8',
      'teal/10': '#E7F9F7'
    },
    purple: {
      'purple/1': '#100712',
      'purple/2': '#1F0F25',
      'purple/3': '#3E1E4A',
      'purple/4': '#5E2D6F',
      'purple/5': '#7D3C94',
      'purple/6': '#9C4BB9',
      'purple/7': '#B06FC7',
      'purple/8': '#D191E1',
      'purple/9': '#E1C9EA',
      'purple/10': '#F5EDF8'
    },
    gray: {
      'gray/1': '#111827',
      'gray/2': '#1F2937',
      'gray/3': '#374151',
      'gray/4': '#4B5563',
      'gray/5': '#6B7280',
      'gray/6': '#9CA3AF',
      'gray/7': '#D1D5DB',
      'gray/8': '#E5E7EB',
      'gray/9': '#F3F4F6',
      'gray/10': '#F9FAFB'
    },
    error: {
      'error/1': '#180B0B',
      'error/2': '#311717',
      'error/3': '#492222',
      'error/4': '#924444',
      'error/5': '#C25B5B',
      'error/6': '#F37272',
      'error/7': '#F58E8E',
      'error/8': '#F9B9B9',
      'error/9': '#FBD5D5',
      'error/10': '#FEF1F1'
    },
    success: {
      'success/1': '#041108',
      'success/2': '#0D3218',
      'success/3': '#175328',
      'success/4': '#1B642F',
      'success/5': '#24853F',
      'success/6': '#2DA64F',
      'success/7': '#57B872',
      'success/8': '#81CA95',
      'success/9': '#C0E4CA',
      'success/10': '#EAF6ED'
    },
    warning: {
      'warning/1': '#18160E',
      'warning/2': '#494229',
      'warning/3': '#796E45',
      'warning/4': '#918453',
      'warning/5': '#C2B06E',
      'warning/6': '#F2DC8A',
      'warning/7': '#F5E3A1',
      'warning/8': '#F9EEC5',
      'warning/9': '#FBF5DC',
      'warning/10': '#FEFCF3'
    }
  }
};
