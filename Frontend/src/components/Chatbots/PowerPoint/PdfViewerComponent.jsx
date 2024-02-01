import { lazy, useEffect, useRef, useState } from 'react';
import { site } from '../../../util/variables';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function PdfViewerComponent(props) {
	
	return (<div className='flex relative w-full, h-full justify-center items-center'>
		<div className='p-3'>
			<a href={`${props.document}.pptx`} onClick={props.downloadPPTX} style={{color: 'blue', fontSize: 28}}>{`Please download Powerpoint Slide here`}</a>
		</div>
	</div>
	);
}