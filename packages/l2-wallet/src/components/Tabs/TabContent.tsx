import React from 'react';

type Props = {
  id: number | string;
  activeTab: number | string;
  children: JSX.Element;
};

export default function TabContent({ id, activeTab, children }: Props) {
  return activeTab === id ? <div className="TabContent">{children}</div> : null;
}
