import React, { Suspense, lazy } from "react";
import Default from "../components/Default";
import Loader from "../elements/Loader/Loader";
const MCContent = lazy(() => import("../elements/MC/MCContent"));

const MC = () => {
	return (
		<Default height="90%" heading="MC" resizable={false} programName="MC">
			<Suspense fallback={<Loader />}>
				<MCContent />
			</Suspense>
		</Default>
	);
};

export default MC;
