import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body;

	if (!body.firstName || !body.lastName || !body.email || !body.phoneNumber || !body.arrival || !body.departure || !body.amount) {
		return res.status(400).json({
			data: "Please fill out form",
		});
	}

	res.status(200).json({
		data: "Form submitted",
	});
}
