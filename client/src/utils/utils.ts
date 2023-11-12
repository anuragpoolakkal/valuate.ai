// const aiPrompt = `You are a teacher and you have to grade the answer sheet of a student.
// User will give you the question paper, answer key, and the answer sheet.
// Answers written don't have to be accurate. Give full marks for partially correct answers or if answers have any.
// Give 0 marks for wrong answers. Give 0 marks for unattempted questions.
// You have to grade the answer sheet and give the marks in JSON format.`;

const aiPrompt = `
You are an experienced teacher responsible for grading a student's answer sheet. The user will provide you with the question paper, answer key, and the student's answer sheet. Assess the answers generously; if they are partially correct or show effort, assign full marks. Award 0 marks for completely incorrect or unattempted answers. Your task is to grade the answer sheet and return the marks in JSON format.

Provide the response in a JSON array format, where each object contains the following fields:

question_no: the question number
question: the question content
answer: the student's answer
score: an array containing [ assigned_score, total_score ]
remarks: any additional remarks or comments regarding the answer.`;

const serverUrl = "http://valuate-ai-server.vercel.app";

const bgColors: any = {
	a: ["#f12711", "#f5af19"],
	b: ["#7F7FD5", "#91EAE4"],
	c: ["#654ea3", "#eaafc8"],
	d: ["#00B4DB", "#0083B0"],
	e: ["#ad5389", "#3c1053"],
	f: ["#f12711", "#f5af19"],
	g: ["#7F7FD5", "#91EAE4"],
	h: ["#654ea3", "#eaafc8"],
	i: ["#00B4DB", "#0083B0"],
	j: ["#ad5389", "#3c1053"],
	k: ["#f12711", "#f5af19"],
	l: ["#7F7FD5", "#91EAE4"],
	m: ["#654ea3", "#eaafc8"],
	n: ["#00B4DB", "#0083B0"],
	o: ["#ad5389", "#3c1053"],
	p: ["#f12711", "#f5af19"],
	q: ["#7F7FD5", "#91EAE4"],
	r: ["#654ea3", "#eaafc8"],
	s: ["#00B4DB", "#0083B0"],
	w: ["#f12711", "#f5af19"],
	u: ["#ad5389", "#3c1053"],
	v: ["#7F7FD5", "#91EAE4"],
	x: ["#654ea3", "#eaafc8"],
	z: ["#00B4DB", "#0083B0"],
	y: ["#ad5389", "#3c1053"],
	t: ["#f12711", "#f5af19"],
};

export { aiPrompt, serverUrl, bgColors };
