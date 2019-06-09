import React from "react";

const SingleMessage = (props) => {

	// const postMessage = (employer_id, student_id, postData) => {
	// 	newRef
	// 		.child(employer_id)
	// 		.child(student_id)
	// 		.on("value", function(snapshot) {
	// 			newRef
	// 				.child(employer_id)
	// 				.child(student_id)
	// 				.child(moment().format())
	// 				.set(postData);

	// 			// console.log(snapshot.val())

	// 			// console.log(_.keys(snapshot.val()))
	// 		});
	// };

	// var postData = {
	// 	from: "emplyer-or-student",
	// 	content: "this is my new message",
  //   student_name: "james",
  //   employer_name: "google",
	// 	from_employer: false,
	// 	from_student: true,
	// 	employer_read: true,
  //   student_read: false,
	// };

	// useEffect(() => {
	// 	postMessage(21, '33-Simon Alex',  postData);
	// }, []);

	return (
		<div className={props.identifier}>
			<h6>{props.sender}</h6>
			<p>
				{props.content}
			</p>
		</div>
	);
};

export default SingleMessage;
