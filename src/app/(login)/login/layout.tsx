import React, { PropsWithChildren } from 'react';
import LayoutWithoutNavAndFooter from '@/components/layouts/LayoutWithoutNavAndFooter';

const LandingPageLayout: React.FC<PropsWithChildren> = (props) => {
	return <LayoutWithoutNavAndFooter>{props.children}</LayoutWithoutNavAndFooter>;
};

export default LandingPageLayout;
