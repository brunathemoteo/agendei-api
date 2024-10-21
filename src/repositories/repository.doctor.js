import db from "../database/db.js";

async function getDoctors() {
	const sql = "SELECT * FROM doctors ORDER BY name";
	const doctors = await db.query(sql, []);
	return doctors.recordset;
}

export default { getDoctors };
