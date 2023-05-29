import { useState } from 'react';
import Tab from './Tab';

export default {
	title: 'Tab',
	component: Tab,
	// tags: ['autodocs'],
};

const tabList = [
	{ id: 1, name: 'Tab 1' },
	{ id: 2, name: 'Tab 2' },
	{ id: 3, name: 'Tab 3' },
	{ id: 4, name: 'Tab 4' }
];

const TabWidthHooks = ({ variant }) => {
	const [activeId, setActiveId] = useState(1);

	return (
		<Tab
			variant={variant}
			tabList={[...tabList]}
			activeItemId={activeId}
			onSetActiveItemId={setActiveId}
		/>
	);
}

export const Primary = {
	render: () => <TabWidthHooks variant="primary" />
};

export const Secondary = {
	render: () => <TabWidthHooks variant="secondary" />
};
