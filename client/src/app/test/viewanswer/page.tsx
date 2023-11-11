"use client";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const SampleTable = () => {
	const [numPages, setNumPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState<number>(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}
	return (
		<main className="h-full w-full p-10 bg-white">
			<div></div>
			<div>
				<Document file={"/assets/samplepdf.pdf"} onLoadSuccess={onDocumentLoadSuccess}>
					<Page pageNumber={pageNumber} />
				</Document>
				<p>
					Page {pageNumber} of {numPages}
				</p>
			</div>
		</main>
	);
};

export default SampleTable;
