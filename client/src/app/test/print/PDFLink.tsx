import Print from "./Print";
import { PDFDownloadLink } from "@react-pdf/renderer";

function PdfLink({ data, image }) {
	return (
		<PDFDownloadLink document={<Print data={data} image={image} />} filename="FORM">
			{({ loading }) =>
				loading ? (
					<button
						type="button"
						class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						Loading Document...
					</button>
				) : (
					<button
						type="button"
						class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						Download
					</button>
				)
			}
		</PDFDownloadLink>
	);
}

export default PdfLink;
