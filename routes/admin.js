// const express = require("express");
// const router = express.Router();
// const exe = require("../connection"); // MySQL query executor
// const path = require("path");

// // Dashboard Page
// router.get("/", (req, res) => {
//   res.render("admin/index");
// });

// // ------------------ Slider ------------------

// // Slider Form Page
// router.get("/slider", async (req, res) => {
//   const sliders = await exe("SELECT * FROM slider");
//   res.render("admin/slider", { sliders });
// });

// // Save Slider (without actual file upload for now)
// router.post("/slider", async (req, res) => {
//   const title = req.body.title || "Untitled Slider";
//   await exe("INSERT INTO slider (title, image) VALUES (?, ?)", [title, "default.png"]);
//   res.redirect("/admin/slider_list");
// });

// // Slider List Page
// router.get("/slider_list", async (req, res) => {
//   const sliders = await exe("SELECT * FROM slider");
//   res.render("admin/slider_list", { sliders });
// });

// // Delete Slider
// router.get("/slider/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM slider WHERE id = ?", [id]);
//   res.redirect("/admin/slider_list");
// });

// // ------------------ Machine ------------------

// // Add Machine Page
// router.get("/machine", (req, res) => {
//   res.render("admin/machine");
// });

// // Save Machine
// router.post("/save_machine", async (req, res) => {
//   try {
//     const d = req.body;
//     let file_name = "";

//     if (req.files && req.files.machine_image) {
//       file_name = Date.now() + "_" + req.files.machine_image.name.replace(/\s/g, "_");
//       await req.files.machine_image.mv(path.join(__dirname, "../public/uploads/", file_name));
//     }

//     let sql = `INSERT INTO machine (machine_name, file_name, machine_status)
//                VALUES (?, ?, ?)`;
//     await exe(sql, [d.machine_name, file_name, d.machine_status]);

//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error("❌ Error while saving machine:", err);
//     res.send("Something went wrong while saving machine data.");
//   }
// });

// // Machine List Page
// router.get("/machine_list", async (req, res) => {
//   let machines = await exe("SELECT * FROM machine");
//   res.render("admin/machine_list", { machines });
// });

// // Edit Machine Page
// router.get("/machine_edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM machine WHERE machine_id=?";
//   const machine = (await exe(sql, [id]))[0];
//   res.render("admin/edit_machine", { machine });
// });

// // Update Machine
// router.post("/update_machine/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const d = req.body;

//     let file_name = d.old_file;

//     if (req.files && req.files.machine_image) {
//       file_name = Date.now() + "_" + req.files.machine_image.name.replace(/\s/g, "_");
//       await req.files.machine_image.mv(path.join(__dirname, "../public/uploads/", file_name));
//     }

//     const sql = `UPDATE machine SET machine_name=?, file_name=?, machine_status=? WHERE machine_id=?`;
//     await exe(sql, [d.machine_name, file_name, d.machine_status, id]);

//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error("❌ Error while updating machine:", err);
//     res.send("Something went wrong while updating machine data.");
//   }
// });

// // Delete Machine
// router.get("/delete_machine/:id", async (req, res) => {
//   const id = req.params.id;
//   const sql = "DELETE FROM machine WHERE machine_id=?";
//   await exe(sql, [id]);
//   res.redirect("/admin/machine_list");
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const exe = require("../connection"); // तुमचा DB connection file
// const path = require("path");
// const fs = require("fs");

// // Dashboard Page
// router.get("/", async (req, res) => {
//   try {
//     const sliderCount = await exe("SELECT COUNT(*) as count FROM slider");
//     const serviceCount = await exe("SELECT COUNT(*) as count FROM services");
//     const machineCount = await exe("SELECT COUNT(*) as count FROM machine");
//     const plantCount = await exe("SELECT COUNT(*) as count FROM plants");
//     const workprocessCount = await exe("SELECT COUNT(*) as count FROM workingprocess");

//     res.render("admin/index", {
//       sliders: sliderCount[0]?.count || 0,
//       services: serviceCount[0]?.count || 0,
//       machines: machineCount[0]?.count || 0,
//       plants: plantCount[0]?.count || 0,
//       workingprocesses: workprocessCount[0]?.count || 0
//     });
//   } catch (err) {
//     console.error("Error fetching dashboard data:", err);
//     res.render("admin/index", {
//       sliders: 0,
//       services: 0,
//       machines: 0,
//       plants: 0,
//       workingprocesses: 0
//     });
//   }
// });


// // ------------------ Slider ------------------

// // Slider Form Page (Add)
// router.get("/slider", async (req, res) => {
//   try {
//     const sliders = await exe("SELECT * FROM slider");
//     res.render("admin/slider", { sliders });
//   } catch (err) {
//     console.error("Error fetching sliders:", err);
//     res.render("admin/slider", { sliders: [] });
//   }
// });

// // Save Slider (with 4 image uploads)
// router.post("/slider", async (req, res) => {
//   try {
//     const title = req.body.title || "Untitled Slider";
//     let image1 = "";
//     let image2 = "";
//     let image3 = "";
//     let image4 = "";

//     // Handle 4 file uploads
//     if (req.files) {
//       if (req.files.image1) {
//         const upload = req.files.image1;
//         image1 = Date.now() + "_1_" + upload.name.replace(/\s+/g, "_");
//         await upload.mv("./public/uploads/" + image1);
//       }
//       if (req.files.image2) {
//         const upload = req.files.image2;
//         image2 = Date.now() + "_2_" + upload.name.replace(/\s+/g, "_");
//         await upload.mv("./public/uploads/" + image2);
//       }
//       if (req.files.image3) {
//         const upload = req.files.image3;
//         image3 = Date.now() + "_3_" + upload.name.replace(/\s+/g, "_");
//         await upload.mv("./public/uploads/" + image3);
//       }
//       if (req.files.image4) {
//         const upload = req.files.image4;
//         image4 = Date.now() + "_4_" + upload.name.replace(/\s+/g, "_");
//         await upload.mv("./public/uploads/" + image4);
//       }
//     }

//     // Insert into database
//     await exe("INSERT INTO slider (title, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?)", [title, image1, image2, image3, image4]);
//     res.redirect("/admin/slider_list");
//   } catch (err) {
//     console.error("Error saving slider:", err);
//     res.send("Error saving slider: " + err.message);
//   }
// });

// // Slider List Page
// router.get("/slider_list", async (req, res) => {
//   try {
//     const sliders = await exe("SELECT * FROM slider");
//     res.render("admin/slider_list", { sliders });
//   } catch (err) {
//     console.error("Error fetching slider list:", err);
//     res.render("admin/slider_list", { sliders: [] });
//   }
// });

// // Delete Slider
// router.get("/slider/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     await exe("DELETE FROM slider WHERE slider_id = ?", [id]);
//     res.redirect("/admin/slider_list");
//   } catch (err) {
//     console.error("Error deleting slider:", err);
//     res.send("Error deleting slider: " + err.message);
//   }
// });

// // Edit Slider - show form
// router.get("/slider/edit/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const slider = (await exe("SELECT * FROM slider WHERE slider_id = ?", [id]))[0];
//     if (!slider) return res.status(404).send("Slider not found");
//     res.render("admin/slider_edit", { slider });
//   } catch (err) {
//     console.error("Error fetching slider for edit:", err);
//     res.send("Error fetching slider: " + err.message);
//   }
// });

// // Edit Slider - save changes
// router.post("/slider/edit/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const title = req.body.title || "Untitled Slider";
//     await exe("UPDATE slider SET title = ? WHERE slider_id = ?", [title, id]);
//     res.redirect("/admin/slider_list");
//   } catch (err) {
//     console.error("Error updating slider:", err);
//     res.send("Error updating slider: " + err.message);
//   }
// });

// // Machine - Add
// router.get("/machine", (req, res) => {
//   res.render("admin/machine");
// });

// // Machine - Save
// router.post("/save_machine", async (req, res) => {
//   try {
//     const d = req.body || {};
//     const title = d.title || d.machine_name || "Untitled Machine";
//     const description = d.description || "";
//     const status = d.machine_status || "Active";

//     const uploadedNames = [];

//     // ensure upload directory exists
//     const uploadDir = path.join(__dirname, "..", "public", "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     if (req.files) {
//       const imgs = ["image1", "image2", "image3"];
//       for (const key of imgs) {
//         const f = req.files[key];
//         if (f) {
//           const safeName = f.name.replace(/\s+/g, "_");
//           const fname = Date.now() + "_" + key + "_" + safeName;
//           const dest = path.join(uploadDir, fname);
//           await f.mv(dest);
//           uploadedNames.push(fname);
//         }
//       }
//     }

//     // Insert with separate image1, image2, image3 columns
//     const sql = `INSERT INTO machine (machine_name, image1, image2, image3, machine_status, description)
//                  VALUES (?, ?, ?, ?, ?, ?)`;
//     await exe(sql, [
//       title,
//       uploadedNames[0] || null,
//       uploadedNames[1] || null,
//       uploadedNames[2] || null,
//       status,
//       description
//     ]);

//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error("Error in /save_machine:", err);
//     res.status(500).send("Error saving machine: " + (err && err.message ? err.message : String(err)));
//   }
// });


// // Machine - List
// router.get("/machine_list", async (req, res) => {
//   try {
//     const machines = await exe("SELECT * FROM machine");
//     // Log schema and first row to help debug image column
//     if (machines && machines.length > 0) {
//       const cols = await exe("SHOW COLUMNS FROM machine");
//       console.log("=== Machine Table Columns ===");
//       cols.forEach(c => console.log(`  ${c.Field} (${c.Type})`));
//       console.log("=== First Machine Row ===");
//       console.log(JSON.stringify(machines[0], null, 2));
//     }
//     res.render("admin/machine_list", { machines });
//   } catch (err) {
//     console.error("Error fetching machine list:", err);
//     res.render("admin/machine_list", { machines: [] });
//   }
// });

// // Machine - Edit
// router.get("/machine_edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const machine = (await exe("SELECT * FROM machine WHERE machine_id=?", [id]))[0];
//   res.render("admin/edit_machine", { machine });
// });
// router.post("/update_machine/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const d = req.body || {};

//     const existing = (await exe("SELECT * FROM machine WHERE machine_id=?", [id]))[0];
//     const uploadDir = path.join(__dirname, "..", "public", "uploads");

//     // Start with existing images
//     let newImage1 = existing.image1 || null;
//     let newImage2 = existing.image2 || null;
//     let newImage3 = existing.image3 || null;

//     // Replace with new uploads if provided
//     if (req.files) {
//       if (req.files.image1) {
//         const f = req.files.image1;
//         const fname = Date.now() + "_image1_" + f.name.replace(/\s+/g, "_");
//         await f.mv(path.join(uploadDir, fname));
//         newImage1 = fname;
//       }
//       if (req.files.image2) {
//         const f = req.files.image2;
//         const fname = Date.now() + "_image2_" + f.name.replace(/\s+/g, "_");
//         await f.mv(path.join(uploadDir, fname));
//         newImage2 = fname;
//       }
//       if (req.files.image3) {
//         const f = req.files.image3;
//         const fname = Date.now() + "_image3_" + f.name.replace(/\s+/g, "_");
//         await f.mv(path.join(uploadDir, fname));
//         newImage3 = fname;
//       }
//     }

//     const title = d.title || existing.machine_name;
//     const description = d.description || existing.description;
//     const status = d.machine_status || existing.machine_status;

//     const sql = `UPDATE machine 
//                  SET machine_name=?, image1=?, image2=?, image3=?, machine_status=?, description=? 
//                  WHERE machine_id=?`;

//     await exe(sql, [title, newImage1, newImage2, newImage3, status, description, id]);

//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error(err);
//     res.send("Error updating machine.");
//   }
// });


// // Machine - Delete
// router.get("/delete_machine/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await exe("DELETE FROM machine WHERE machine_id=?", [id]);
//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error("Error deleting machine:", err);
//     res.status(500).send("Error deleting machine.");
//   }
// });

// // Legacy/alternate route kept for compatibility: /admin/machine_delete/:id
// router.get("/machine_delete/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await exe("DELETE FROM machine WHERE machine_id=?", [id]);
//     res.redirect("/admin/machine_list");
//   } catch (err) {
//     console.error("Error deleting machine (legacy route):", err);
//     res.status(500).send("Error deleting machine.");
//   }
// });




// // ------------------ About ------------------

// // GET about form/page
// router.get('/about', async (req, res) => {
//   try {
//     const rows = await exe('SELECT * FROM about LIMIT 1');
//     const about = rows && rows.length ? rows[0] : null;
//     res.render('admin/about', { about });
//   } catch (err) {
//     console.error('Error fetching about data:', err);
//     res.render('admin/about', { about: null });
//   }
// });

// // POST save about (insert or update)
// router.post('/about', async (req, res) => {
//   try {
//     const d = req.body;
//     let bgFile = d.old_background || '';

//     if (req.files && req.files.backgroundImage) {
//       const upload = req.files.backgroundImage;
//       const file_name = Date.now() + '_' + upload.name.replace(/\s+/g, '_');
//       await upload.mv('./public/uploads/' + file_name);
//       bgFile = file_name;
//     }

//     // check if record exists
//     const existing = await exe('SELECT * FROM about LIMIT 1');
//     if (existing && existing.length) {
//       // update
//       const id = existing[0].id;
//       await exe('UPDATE about SET title=?, background=?, description=?, name=? WHERE id=?', [d.title, bgFile, d.description, d.name, id]);
//     } else {
//       // insert
//       await exe('INSERT INTO about (title, background, description, name) VALUES (?, ?, ?, ?)', [d.title, bgFile, d.description, d.name]);
//     }

//     res.redirect('/admin/about');
//   } catch (err) {
//     console.error('Error saving about data:', err);
//     res.send('Error saving about data.');
//   }
// });


// // About - List
// router.get("/about_list", async (req, res) => {
//   const abouts = await exe("SELECT * FROM about"); // database मधून सर्व about records
//   res.render("admin/about_list", { abouts }); // about_list.ejs मध्ये पाठवतो
// });


// // About - Edit
// router.get("/about_edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const about = (await exe("SELECT * FROM about WHERE about_id=?", [id]))[0];
//   res.render("admin/about_edit", { about });
// });

// // About - Update
// router.post("/update_about/:id", async (req, res) => {
//   const id = req.params.id;
//   const d = req.body;

//   let bgFile = d.old_bg; // old file name by default
//   if (req.files && req.files.background) {
//     bgFile = Date.now() + "_" + req.files.background.name.replace(/\s/g, "_");
//     await req.files.background.mv("./public/uploads/" + bgFile);
//   }

//   let sql = `UPDATE about SET title=?, background=?, description=?, name=? WHERE about_id=?`;
//   await exe(sql, [d.title, bgFile, d.description, d.name, id]);

//   res.redirect("/admin/about_list");
// });


// // ------------------ Counter ------------------

// // Show counter form + list
// router.get("/counter", async (req, res) => {
//   const counters = await exe("SELECT * FROM counter");
//   res.render("admin/counter", { counters });
// });

// // Save new counter
// router.post("/counter", async (req, res) => {
//   const d = req.body;
//   const name = d.name || "Counter";
//   const value = d.value ? parseInt(d.value) : 0;
//   const color = d.color || "";
//   const step_inc = d.step_inc ? parseInt(d.step_inc) : 1;
//   const step_dec = d.step_dec ? parseInt(d.step_dec) : 1;
//   const description = d.description || "";

//   await exe(
//     "INSERT INTO counter (name, value, color, step_inc, step_dec, description) VALUES (?, ?, ?, ?, ?, ?)",
//     [name, value, color, step_inc, step_dec, description]
//   );

//   res.redirect("/admin/counter");
// });

// // Increase counter
// router.get("/counter/increase/:id", async (req, res) => {
//   const id = req.params.id;
//   const row = (await exe("SELECT * FROM counter WHERE id = ?", [id]))[0];
//   if (!row) return res.redirect("/admin/counter");

//   const newVal = (row.value || 0) + (row.step_inc || 1);
//   await exe("UPDATE counter SET value = ? WHERE id = ?", [newVal, id]);
//   res.redirect("/admin/counter");
// });

// // Decrease counter
// router.get("/counter/decrease/:id", async (req, res) => {
//   const id = req.params.id;
//   const row = (await exe("SELECT * FROM counter WHERE id = ?", [id]))[0];
//   if (!row) return res.redirect("/admin/counter");

//   const newVal = (row.value || 0) - (row.step_dec || 1);
//   await exe("UPDATE counter SET value = ? WHERE id = ?", [newVal, id]);
//   res.redirect("/admin/counter");
// });

// // Delete counter
// router.get("/counter/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM counter WHERE id = ?", [id]);
//   res.redirect("/admin/counter");
// });

// // ------------------ Working Process ------------------
// // Get working process list


// router.get("/workingprocess", async (req, res) => {
//   const processes = await exe("SELECT * FROM workingprocess ORDER BY workingprocess_id DESC");
//   res.render("admin/workingprocess", { processes });
// });

// // POST new working process (1 title + 1 name + 1 image)
// router.post("/workingprocess", async (req, res) => {
//   try {
//     const { title, name } = req.body;
//     const uploadDir = path.join(__dirname, "..", "public", "uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     let imageFile = null;
//     if (req.files && req.files.image) {
//       const f = req.files.image;
//       const fname = Date.now() + "_" + f.name.replace(/\s+/g, "_");
//       await f.mv(path.join(uploadDir, fname));
//       imageFile = fname;
//     }

//     await exe(
//       "INSERT INTO workingprocess (title, name, image) VALUES (?, ?, ?)",
//       [title || null, name || null, imageFile || null]
//     );

//     res.redirect("/admin/workingprocess");
//   } catch (err) {
//     console.error("Error saving workingprocess:", err);
//     res.status(500).send("Error saving working process: " + (err && err.message ? err.message : String(err)));
//   }
// });

// // GET list page
// router.get("/workingprocess_list", async (req, res) => {
//   const processes = await exe("SELECT * FROM workingprocess ORDER BY workingprocess_id DESC");
//   res.render("admin/workingprocess_list", { processes });
// });

// // Edit form
// router.get("/workingprocess/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const process = (await exe("SELECT * FROM workingprocess WHERE workingprocess_id = ?", [id]))[0];
//   res.render("admin/edit_workingprocess", { process });
// });

// // Edit save
// router.post("/workingprocess/edit/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { title, name } = req.body;

//     const uploadDir = path.join(__dirname, "..", "public", "uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     const existing = (await exe("SELECT * FROM workingprocess WHERE workingprocess_id = ?", [id]))[0] || {};

//     let imageFile = existing.image || null;
//     if (req.files && req.files.image) {
//       const f = req.files.image;
//       const fname = Date.now() + "_" + f.name.replace(/\s+/g, "_");
//       await f.mv(path.join(uploadDir, fname));
//       imageFile = fname;
//     }

//     await exe(
//       "UPDATE workingprocess SET title = ?, name = ?, image = ? WHERE workingprocess_id = ?",
//       [title || existing.title, name || existing.name, imageFile, id]
//     );

//     res.redirect("/admin/workingprocess_list");
//   } catch (err) {
//     console.error("Error updating workingprocess:", err);
//     res.status(500).send("Error updating working process: " + (err && err.message ? err.message : String(err)));
//   }
// });

// // Delete
// router.get("/workingprocess/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM workingprocess WHERE workingprocess_id = ?", [id]);
//   res.redirect("/admin/workingprocess_list");
// });

// // API route for React frontend
// router.get("/workingprocess_api", async (req, res) => {
//   const processes = await exe("SELECT * FROM workingprocess ORDER BY workingprocess_id ASC");
//   const data = processes.map(p => ({
//     id: p.workingprocess_id,
//     title: p.title,
//     name: p.name,
//     image: p.image ? `http://localhost:3000/uploads/${p.image}` : null
//   }));
//   res.json(data);
// });






// // List all news blogs
// router.get("/newsblog_list", async (req, res) => {
//   const newsblogs = await exe("SELECT * FROM newsblog");
//   res.render("admin/newsblog_list", { newsblogs });
// });

// // Show add news blog form
// router.get("/newsblog", (req, res) => {
//   res.render("admin/newsblog"); // form page
// });

// // Add new news blog
// router.post("/newblog", async (req, res) => {
//   const d = req.body;
//   let fileName = "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   const title = d.title || "News Title";
//   const description = d.description || "";
//   const date = d.date || null;

//   await exe(
//     "INSERT INTO newsblog (title, description, date, image) VALUES (?, ?, ?, ?)",
//     [title, description, date, fileName]
//   );

//   res.redirect("/admin/newsblog_list");
// });



// router.get("/newsblog/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const blog = (await exe("SELECT * FROM newsblog WHERE newsblog_id = ?", [id]))[0];
//   res.render("admin/edit_newsblog", { blog });
// });

// // Save edited news blog
// router.post("/newsblog/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const d = req.body;
//   let fileName = d.old_image || "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "UPDATE newsblog SET title = ?, description = ?, date = ?, image = ? WHERE newsblog_id = ?",
//     [d.title, d.description, d.date, fileName, id]
//   );

//   res.redirect("/admin/newsblog_list");
// });

// // Delete news blog
// router.get("/newsblog/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM newsblog WHERE newsblog_id = ?", [id]);
//   res.redirect("/admin/newsblog_list");
// });


// // Show create plant form
// router.get("/plants", (req, res) => {
//   res.render("admin/plants");
// });

// // Save new plant
// router.post("/plants", async (req, res) => {
//   const d = req.body;
//   let fileName = "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "INSERT INTO plants (name, email, mobile, address, date, image) VALUES (?, ?, ?, ?, ?, ?)",
//     [d.name, d.email, d.mobile, d.address, d.date, fileName]
//   );

//   res.redirect("/admin/plants_list");
// });

// // List all plants
// router.get("/plants_list", async (req, res) => {
//   let plants = await exe("SELECT * FROM plants ORDER BY plant_id DESC");
//   res.render("admin/plants_list", { plants });
// });

// // Edit plant form
// router.get("/plants/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const plant = (await exe("SELECT * FROM plants WHERE plant_id = ?", [id]))[0];
//   res.render("admin/edit_plants", { plant });
// });

// // Save edited plant
// router.post("/plants/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const d = req.body;
//   let fileName = d.old_image || "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "UPDATE plants SET name=?, email=?, mobile=?, address=?, date=?, image=? WHERE plant_id=?",
//     [d.name, d.email, d.mobile, d.address, d.date, fileName, id]
//   );

//   res.redirect("/admin/plants_list");
// });

// // Delete plant
// router.get("/plants/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM plants WHERE plant_id=?", [id]);
//   res.redirect("/admin/plants_list");
// });



// // Show Contact List
// router.get("/contact_list", async (req, res) => {
//   const contacts = await exe("SELECT * FROM contact");
//   res.render("admin/contact_list", { contacts });
// });

// // Show Contact Form
// router.get("/contact", (req, res) => {
//   res.render("admin/contact");
// });

// // Save New Contact
// router.post("/contact", async (req, res) => {
//   try {
//     const d = req.body;
//     let fileName = "";

//     if (req.files && req.files.image) {
//       const upload = req.files.image;
//       fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//       await upload.mv("./public/uploads/" + fileName);
//     }

//     await exe(
//       "INSERT INTO contact (name, email, number, mobile, address, image) VALUES (?, ?, ?, ?, ?, ?)",
//       [d.name, d.email, d.number, d.mobile, d.address, fileName]
//     );

//     res.redirect("/admin/contact_list");
//   } catch (err) {
//     console.error("Error saving contact:", err);
//     res.send("Error saving contact: " + err.message);
//   }
// });

// // Backward-compatible route for /save/contact
// router.post("/save/contact", async (req, res) => {
//   try {
//     const d = req.body;
//     let fileName = "";

//     if (req.files && req.files.image) {
//       const upload = req.files.image;
//       fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//       await upload.mv("./public/uploads/" + fileName);
//     }

//     await exe(
//       "INSERT INTO contact (name, email, number, mobile, address, image) VALUES (?, ?, ?, ?, ?, ?)",
//       [d.name, d.email, d.number, d.mobile, d.address, fileName]
//     );

//     res.redirect("/admin/contact_list");
//   } catch (err) {
//     console.error("Error saving contact:", err);
//     res.send("Error saving contact: " + err.message);
//   }
// });

// // Edit Contact (Form)
// router.get("/contact/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const contact = (await exe("SELECT * FROM contact WHERE contact_id = ?", [id]))[0];
//   res.render("admin/edit_contact", { contact });
// });

// // Update Contact
// router.post("/contact/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const d = req.body;
//   let fileName = d.old_image || "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "UPDATE contact SET name = ?, email = ?, number = ?, mobile = ?, address = ?, image = ? WHERE contact_id = ?",
//     [d.name, d.email, d.number, d.mobile, d.address, fileName, id]
//   );

//   res.redirect("/admin/contact_list");
// });

// // Delete Contact
// router.get("/contact/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM contact WHERE contact_id = ?", [id]);
//   res.redirect("/admin/contact_list");
// });




// // 1. Services List Page
// router.get("/services", async (req, res) => {
//   const services = await exe("SELECT * FROM services");
//   res.render("admin/service_list", { services });
// });

// // Backwards-compatible plural routes
// router.get("/services_list", (req, res) => {
//   // redirect to the canonical list route
//   return res.redirect("/admin/services");
// });

// router.get("/services", (req, res) => {
//   // redirect to canonical list route (keeps behavior consistent)
//   return res.redirect("/admin/services");
// });

// // 2. Add Service Form
// router.get("/service", (req, res) => {
//   res.render("admin/service"); // Add Service Form
// });

// // 3. Save New Service
// router.post("/service", async (req, res) => {
//   const d = req.body;
//   let fileName = "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "INSERT INTO services (title, description, image) VALUES (?, ?, ?)",
//     [d.title, d.description, fileName]
//   );

//   res.redirect("/admin/services"); // redirect to list
// });

// // 4. Edit Service Form
// router.get("/service/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const service = (await exe("SELECT * FROM services WHERE services_id = ?", [id]))[0];
//   res.render("admin/edit_service", { service });
// });

// // 5. Update Service
// router.post("/service/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const d = req.body;
//   let fileName = d.old_image || "";

//   if (req.files && req.files.image) {
//     const upload = req.files.image;
//     fileName = Date.now() + "_" + upload.name.replace(/\s+/g, "_");
//     await upload.mv("./public/uploads/" + fileName);
//   }

//   await exe(
//     "UPDATE services SET title = ?, description = ?, image = ? WHERE services_id = ?",
//     [d.title, d.description, fileName, id]
//   );

//   res.redirect("/admin/services");
// });

// // 6. Delete Service
// router.get("/service/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   await exe("DELETE FROM services WHERE services_id = ?", [id]);
//   res.redirect("/admin/services");
// });


// // Show login form
// router.get('/login', (req, res) => {
//   res.render('admin/login'); // now exists
// });

// // Handle login
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   const rows = await exe('SELECT * FROM admins WHERE (email=? OR username=?) AND password=?', [username, username, password]);
//   if (rows && rows.length) {
//     // set session or cookie, then redirect
//     req.session.admin = { id: rows[0].id, username: rows[0].username };
//     return res.redirect('/admin');
//   } else {
//     return res.render('admin/login', { error: 'Invalid username or password' });
//   }
// });




// router.get('/logout', (req, res) => {
//   // if using express-session:
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) console.error('Session destroy error', err);
//       return res.render('admin/logout');
//     });
//   } else {
//     res.render('admin/logout');
//   }
// });

// // Show settings
// router.get('/setting', async (req, res) => {
//   const rows = await exe('SELECT * FROM settings LIMIT 1');
//   const settings = rows && rows.length ? rows[0] : null;
//   res.render('admin/setting', { settings });
// });


// // Save settings
// router.post('/setting', async (req, res) => {
//   const d = req.body;
//   let logo = d.old_logo || '';
//   let favicon = d.old_favicon || '';

//   if (req.files && req.files.logo) {
//     const up = req.files.logo;
//     logo = Date.now() + '_' + up.name.replace(/\s+/g, '_');
//     await up.mv('./public/uploads/' + logo);
//   }
//   if (req.files && req.files.favicon) {
//     const up = req.files.favicon;
//     favicon = Date.now() + '_' + up.name.replace(/\s+/g, '_');
//     await up.mv('./public/uploads/' + favicon);
//   }

//   // upsert into settings table (implement accordingly)
//   // ...
//   res.redirect('/admin/setting');
// });

// // Backwards-compatible plural route: /admin/settings -> /admin/setting
// router.get('/settings', (req, res) => {
//   return res.redirect('/admin/setting');
// });



// // router.get("/slider_api", async (req, res) => {
// //   const sliders = await exe("SELECT * FROM slider");
// //   const data = sliders.map(slide => ({
// //     ...slide,
// //     image: `http://localhost:3000/uploads/${slide.image}`  
// //   }));
// //   res.json(data); // JSON format मध्ये React ला पाठवतो
// // });

// router.get("/slider_api", async (req, res) => {
//   const sliders = await exe("SELECT * FROM slider");

//   const data = sliders.map(s => ({
//     slider_id: s.slider_id,
//     title: s.title,
//     image1: `http://localhost:3000/uploads/${s.image1}`,
//     image2: `http://localhost:3000/uploads/${s.image2}`,
//     image3: `http://localhost:3000/uploads/${s.image3}`,
//     image4: `http://localhost:3000/uploads/${s.image4}`,
//   }));

//   res.json(data);
// });




// router.get("/counter_api", async (req, res) => {
//   const counters = await exe("SELECT * FROM counter");
//   res.json(counters);
// });


// router.get("/service_api", async (req, res) => {
//   const services = await exe("SELECT * FROM services");
//   res.json(services);
// });

// // router.get("/plants_api", async (req, res) => {
// //   const rows = await exe("SELECT * FROM plants");

// //   const data = rows.map((p) => ({
// //     plant_id: p.plant_id,
// //     name: p.name,
// //     email: p.email,
// //     mobile: p.mobile,
// //     address: p.address,
// //     date: p.date,
// //     image: `http://localhost:3000/uploads/${p.image}`,
// //   }));

// //   res.json(data);
// // });

// router.get("/plants_api", async (req, res) => {
//   const plants = await exe("SELECT * FROM plants"); // db table 'plants'
//   // send full URL for images
//   const apiBase = "http://localhost:3000/uploads";
//   const data = (plants || []).map(p => ({
//     ...p,
//     image: p.image ? `${apiBase}/${p.image}` : null
//   }));
//   res.json(data);
// });

// router.get("/about_api", async (req, res) => {
//   const about = await exe("SELECT * FROM about");
//   res.json(about);
// });

// router.get("/machine_api", async (req, res) => {
//   const machines = await exe("SELECT * FROM machine");
//   res.json(machines);
// });
// router.get('/workingprocess_api', async (req, res) => {
//   const processes = await exe('SELECT * FROM workingprocess');

//   const data = processes.map(p => ({
//     id: p.id,
//     name: p.name || p.title || `Step ${p.id}`,
//     description: p.description || "",
//     image: `http://localhost:3000/uploads/${p.image}`
//   }));

//   res.json(data);
// });


// // ================= WORKING PROCESS API =================

// router.get("/workingprocess_api", async (req, res) => {
//   try {
//     const processes = await exe(
//       "SELECT * FROM workingprocess ORDER BY workingprocess_id ASC"
//     );

//     const data = processes.map((p) => ({
//       workingprocess_id: p.workingprocess_id,
//       title: p.title,
//       name: p.name,

//       // Dynamic Image URL
//       image: p.image
//         ? `${req.protocol}://${req.get("host")}/uploads/${p.image}`
//         : null,
//     }));

//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching working process data",
//     });
//   }
// });
// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const exe = require("../connection");
// const path = require("path");
// const fs = require("fs");


// // ================= DASHBOARD =================

// router.get("/", async (req, res) => {
//   try {
//     const sliderCount = await exe("SELECT COUNT(*) as count FROM slider");
//     const serviceCount = await exe("SELECT COUNT(*) as count FROM services");
//     const machineCount = await exe("SELECT COUNT(*) as count FROM machine");
//     const plantCount = await exe("SELECT COUNT(*) as count FROM plants");
//     const workprocessCount = await exe("SELECT COUNT(*) as count FROM workingprocess");

//     res.render("admin/index", {
//       sliders: sliderCount[0]?.count || 0,
//       services: serviceCount[0]?.count || 0,
//       machines: machineCount[0]?.count || 0,
//       plants: plantCount[0]?.count || 0,
//       workingprocesses: workprocessCount[0]?.count || 0
//     });

//   } catch (err) {
//     console.log(err);
//     res.send("Dashboard Error");
//   }
// });


// // ================= SLIDER =================

// // Add Slider Form
// router.get("/slider", async (req, res) => {
//   const sliders = await exe("SELECT * FROM slider");
//   res.render("admin/slider", { sliders });
// });


// // Save Slider
// router.post("/slider", async (req, res) => {
//   try {

//     const title = req.body.title || "";

//     let image1 = "";
//     let image2 = "";
//     let image3 = "";
//     let image4 = "";

//     const uploadDir = path.join(__dirname, "..", "public", "uploads");

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     if (req.files) {

//       if (req.files.image1) {
//         const file = req.files.image1;
//         image1 = Date.now() + "_1_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image1));
//       }

//       if (req.files.image2) {
//         const file = req.files.image2;
//         image2 = Date.now() + "_2_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image2));
//       }

//       if (req.files.image3) {
//         const file = req.files.image3;
//         image3 = Date.now() + "_3_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image3));
//       }

//       if (req.files.image4) {
//         const file = req.files.image4;
//         image4 = Date.now() + "_4_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image4));
//       }
//     }

//     await exe(
//       "INSERT INTO slider (title,image1,image2,image3,image4) VALUES (?,?,?,?,?)",
//       [title, image1, image2, image3, image4]
//     );

//     res.redirect("/admin/slider_list");

//   } catch (err) {
//     console.log(err);
//     res.send("Slider Save Error");
//   }
// });


// // Slider List
// router.get("/slider_list", async (req, res) => {
//   const sliders = await exe("SELECT * FROM slider ORDER BY slider_id DESC");
//   res.render("admin/slider_list", { sliders });
// });


// // Delete Slider
// router.get("/slider/delete/:id", async (req, res) => {

//   const id = req.params.id;

//   await exe("DELETE FROM slider WHERE slider_id=?", [id]);

//   res.redirect("/admin/slider_list");
// });


// // Edit Slider Form
// router.get("/slider/edit/:id", async (req, res) => {

//   const id = req.params.id;

//   const slider = (await exe(
//     "SELECT * FROM slider WHERE slider_id=?",
//     [id]
//   ))[0];

//   res.render("admin/slider_edit", { slider });
// });


// // Update Slider
// router.post("/slider/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const old = (await exe(
//       "SELECT * FROM slider WHERE slider_id=?",
//       [id]
//     ))[0];

//     let image1 = old.image1;
//     let image2 = old.image2;
//     let image3 = old.image3;
//     let image4 = old.image4;

//     const uploadDir = path.join(__dirname, "..", "public", "uploads");

//     if (req.files) {

//       if (req.files.image1) {
//         const file = req.files.image1;
//         image1 = Date.now() + "_1_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image1));
//       }

//       if (req.files.image2) {
//         const file = req.files.image2;
//         image2 = Date.now() + "_2_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image2));
//       }

//       if (req.files.image3) {
//         const file = req.files.image3;
//         image3 = Date.now() + "_3_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image3));
//       }

//       if (req.files.image4) {
//         const file = req.files.image4;
//         image4 = Date.now() + "_4_" + file.name.replace(/\s+/g, "_");
//         await file.mv(path.join(uploadDir, image4));
//       }
//     }

//     await exe(
//       `UPDATE slider 
//        SET title=?, image1=?, image2=?, image3=?, image4=? 
//        WHERE slider_id=?`,
//       [
//         req.body.title,
//         image1,
//         image2,
//         image3,
//         image4,
//         id
//       ]
//     );

//     res.redirect("/admin/slider_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Update Error");
//   }
// });


// // ================= WORKING PROCESS =================


// // Form
// router.get("/workingprocess", async (req, res) => {

//   const processes = await exe(
//     "SELECT * FROM workingprocess ORDER BY workingprocess_id DESC"
//   );

//   res.render("admin/workingprocess", { processes });
// });


// // Save
// router.post("/workingprocess", async (req, res) => {

//   try {

//     const { title, name } = req.body;

//     let image = "";

//     const uploadDir = path.join(__dirname, "..", "public", "uploads");

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     if (req.files && req.files.image) {

//       const file = req.files.image;

//       image = Date.now() + "_" + file.name.replace(/\s+/g, "_");

//       await file.mv(path.join(uploadDir, image));
//     }

//     await exe(
//       "INSERT INTO workingprocess (title,name,image) VALUES (?,?,?)",
//       [title, name, image]
//     );

//     res.redirect("/admin/workingprocess");

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Save Error");
//   }
// });


// // List
// router.get("/workingprocess_list", async (req, res) => {

//   const processes = await exe(
//     "SELECT * FROM workingprocess ORDER BY workingprocess_id DESC"
//   );

//   res.render("admin/workingprocess_list", { processes });
// });


// // Delete
// router.get("/workingprocess/delete/:id", async (req, res) => {

//   const id = req.params.id;

//   await exe(
//     "DELETE FROM workingprocess WHERE workingprocess_id=?",
//     [id]
//   );

//   res.redirect("/admin/workingprocess_list");
// });


// // Edit Form
// router.get("/workingprocess/edit/:id", async (req, res) => {

//   const id = req.params.id;

//   const process = (await exe(
//     "SELECT * FROM workingprocess WHERE workingprocess_id=?",
//     [id]
//   ))[0];

//   res.render("admin/edit_workingprocess", { process });
// });


// // Update
// router.post("/workingprocess/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const old = (await exe(
//       "SELECT * FROM workingprocess WHERE workingprocess_id=?",
//       [id]
//     ))[0];

//     let image = old.image;

//     const uploadDir = path.join(__dirname, "..", "public", "uploads");

//     if (req.files && req.files.image) {

//       const file = req.files.image;

//       image = Date.now() + "_" + file.name.replace(/\s+/g, "_");

//       await file.mv(path.join(uploadDir, image));
//     }

//     await exe(
//       `UPDATE workingprocess 
//        SET title=?, name=?, image=? 
//        WHERE workingprocess_id=?`,
//       [
//         req.body.title,
//         req.body.name,
//         image,
//         id
//       ]
//     );

//     res.redirect("/admin/workingprocess_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Update Error");
//   }
// });


// // ================= SLIDER API =================

// router.get("/slider_api", async (req, res) => {

//   try {

//     const sliders = await exe(
//       "SELECT * FROM slider ORDER BY slider_id DESC"
//     );

//     const data = sliders.map((s) => ({

//       slider_id: s.slider_id,
//       title: s.title,

//       image1: s.image1
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image1}`
//         : null,

//       image2: s.image2
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image2}`
//         : null,

//       image3: s.image3
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image3}`
//         : null,

//       image4: s.image4
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image4}`
//         : null,
//     }));

//     res.json(data);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Slider API Error"
//     });
//   }
// });


// // ================= WORKING PROCESS API =================

// router.get("/workingprocess_api", async (req, res) => {

//   try {

//     const processes = await exe(
//       "SELECT * FROM workingprocess ORDER BY workingprocess_id ASC"
//     );

//     const data = processes.map((p) => ({

//       workingprocess_id: p.workingprocess_id,

//       title: p.title,

//       name: p.name,

//       image: p.image
//         ? `${req.protocol}://${req.get("host")}/uploads/${p.image}`
//         : null,
//     }));

//     res.json(data);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Working Process API Error"
//     });
//   }
// });


// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const exe = require("../connection");
// const path = require("path");
// const fs = require("fs");

// // ================= COMMON =================

// const uploadDir = path.join(__dirname, "..", "public", "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ================= DASHBOARD =================

// router.get("/", async (req, res) => {
//   try {
//     const sliderCount = await exe("SELECT COUNT(*) as count FROM slider");
//     const serviceCount = await exe("SELECT COUNT(*) as count FROM services");
//     const machineCount = await exe("SELECT COUNT(*) as count FROM machine");
//     const plantCount = await exe("SELECT COUNT(*) as count FROM plants");
//     const workprocessCount = await exe("SELECT COUNT(*) as count FROM workingprocess");

//     res.render("admin/index", {
//       sliders: sliderCount[0]?.count || 0,
//       services: serviceCount[0]?.count || 0,
//       machines: machineCount[0]?.count || 0,
//       plants: plantCount[0]?.count || 0,
//       workingprocesses: workprocessCount[0]?.count || 0
//     });

//   } catch (err) {
//     console.log(err);
//     res.send("Dashboard Error");
//   }
// });


// // =====================================================
// // ======================= SLIDER =======================
// // =====================================================


// // Slider Form
// router.get("/slider", async (req, res) => {

//   try {

//     const sliders = await exe(
//       "SELECT * FROM slider ORDER BY slider_id DESC"
//     );

//     res.render("admin/slider", { sliders });

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Page Error");
//   }
// });


// // Save Slider
// router.post("/slider", async (req, res) => {

//   try {

//     const title = req.body.title || "";

//     let image1 = "";
//     let image2 = "";
//     let image3 = "";
//     let image4 = "";

//     if (req.files) {

//       // IMAGE 1
//       if (req.files.image1) {

//         const file = req.files.image1;

//         image1 =
//           Date.now() +
//           "_1_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image1)
//         );
//       }

//       // IMAGE 2
//       if (req.files.image2) {

//         const file = req.files.image2;

//         image2 =
//           Date.now() +
//           "_2_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image2)
//         );
//       }

//       // IMAGE 3
//       if (req.files.image3) {

//         const file = req.files.image3;

//         image3 =
//           Date.now() +
//           "_3_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image3)
//         );
//       }

//       // IMAGE 4
//       if (req.files.image4) {

//         const file = req.files.image4;

//         image4 =
//           Date.now() +
//           "_4_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image4)
//         );
//       }
//     }

//     await exe(
//       `
//       INSERT INTO slider
//       (
//         title,
//         image1,
//         image2,
//         image3,
//         image4
//       )
//       VALUES
//       (
//         ?,
//         ?,
//         ?,
//         ?,
//         ?
//       )
//       `,
//       [
//         title,
//         image1,
//         image2,
//         image3,
//         image4
//       ]
//     );

//     res.redirect("/admin/slider_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Save Error");
//   }
// });


// // Slider List
// router.get("/slider_list", async (req, res) => {

//   try {

//     const sliders = await exe(
//       "SELECT * FROM slider ORDER BY slider_id DESC"
//     );

//     res.render("admin/slider_list", { sliders });

//   } catch (err) {

//     console.log(err);
//     res.send("Slider List Error");
//   }
// });


// // Delete Slider
// router.get("/slider/delete/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     await exe(
//       "DELETE FROM slider WHERE slider_id=?",
//       [id]
//     );

//     res.redirect("/admin/slider_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Delete Error");
//   }
// });


// // Edit Slider Form
// router.get("/slider/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const slider = (
//       await exe(
//         "SELECT * FROM slider WHERE slider_id=?",
//         [id]
//       )
//     )[0];

//     res.render("admin/slider_edit", { slider });

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Edit Error");
//   }
// });


// // Update Slider
// router.post("/slider/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const old = (
//       await exe(
//         "SELECT * FROM slider WHERE slider_id=?",
//         [id]
//       )
//     )[0];

//     let image1 = old.image1;
//     let image2 = old.image2;
//     let image3 = old.image3;
//     let image4 = old.image4;

//     if (req.files) {

//       // IMAGE 1
//       if (req.files.image1) {

//         const file = req.files.image1;

//         image1 =
//           Date.now() +
//           "_1_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image1)
//         );
//       }

//       // IMAGE 2
//       if (req.files.image2) {

//         const file = req.files.image2;

//         image2 =
//           Date.now() +
//           "_2_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image2)
//         );
//       }

//       // IMAGE 3
//       if (req.files.image3) {

//         const file = req.files.image3;

//         image3 =
//           Date.now() +
//           "_3_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image3)
//         );
//       }

//       // IMAGE 4
//       if (req.files.image4) {

//         const file = req.files.image4;

//         image4 =
//           Date.now() +
//           "_4_" +
//           file.name.replace(/\s+/g, "_");

//         await file.mv(
//           path.join(uploadDir, image4)
//         );
//       }
//     }

//     await exe(
//       `
//       UPDATE slider
//       SET
//         title=?,
//         image1=?,
//         image2=?,
//         image3=?,
//         image4=?
//       WHERE slider_id=?
//       `,
//       [
//         req.body.title,
//         image1,
//         image2,
//         image3,
//         image4,
//         id
//       ]
//     );

//     res.redirect("/admin/slider_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Slider Update Error");
//   }
// });



// // ================= LOGIN CHECK =================

// const checkLogin = (req, res, next) => {

//   if (req.session.admin) {

//     next();

//   } else {

//     res.redirect("/admin/login");
//   }
// };


// // ================= LOGIN PAGE =================

// router.get("/login", (req, res) => {

//   res.render("admin/login");
// });


// // ================= LOGIN POST =================

// router.post("/login", async (req, res) => {

//   try {

//     const { username, password } = req.body;

//     const admin = await exe(
//       `
//       SELECT *
//       FROM admins
//       WHERE username=?
//       AND password=?
//       `,
//       [username, password]
//     );

//     if (admin.length > 0) {

//       req.session.admin = admin[0];

//       res.redirect("/admin");

//     } else {

//       res.send("Invalid Username or Password");
//     }

//   } catch (err) {

//     console.log(err);

//     res.send("Login Error");
//   }
// });

// // =====================================================
// // ================= WORKING PROCESS ===================
// // =====================================================


// // Working Process Form
// router.get("/workingprocess", async (req, res) => {

//   try {

//     const processes = await exe(
//       `
//       SELECT *
//       FROM workingprocess
//       ORDER BY workingprocess_id DESC
//       `
//     );

//     res.render("admin/workingprocess", {
//       processes
//     });

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Page Error");
//   }
// });


// // Save Working Process
// router.post("/workingprocess", async (req, res) => {

//   try {

//     const title = req.body.title || "";
//     const name = req.body.name || "";

//     let image = "";

//     if (req.files && req.files.image) {

//       const file = req.files.image;

//       image =
//         Date.now() +
//         "_" +
//         file.name.replace(/\s+/g, "_");

//       await file.mv(
//         path.join(uploadDir, image)
//       );
//     }

//     await exe(
//       `
//       INSERT INTO workingprocess
//       (
//         title,
//         name,
//         image
//       )
//       VALUES
//       (
//         ?,
//         ?,
//         ?
//       )
//       `,
//       [
//         title,
//         name,
//         image
//       ]
//     );

//     res.redirect("/admin/workingprocess");

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Save Error");
//   }
// });


// // Working Process List
// router.get("/workingprocess_list", async (req, res) => {

//   try {

//     const processes = await exe(
//       `
//       SELECT *
//       FROM workingprocess
//       ORDER BY workingprocess_id DESC
//       `
//     );

//     res.render(
//       "admin/workingprocess_list",
//       { processes }
//     );

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process List Error");
//   }
// });


// // Delete Working Process
// router.get("/workingprocess/delete/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     await exe(
//       `
//       DELETE FROM workingprocess
//       WHERE workingprocess_id=?
//       `,
//       [id]
//     );

//     res.redirect("/admin/workingprocess_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Delete Error");
//   }
// });


// // Edit Working Process Form
// router.get("/workingprocess/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const process = (
//       await exe(
//         `
//         SELECT *
//         FROM workingprocess
//         WHERE workingprocess_id=?
//         `,
//         [id]
//       )
//     )[0];

//     res.render(
//       "admin/edit_workingprocess",
//       { process }
//     );

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Edit Error");
//   }
// });



// // ================= CONTACT MESSAGE API =================

// router.post("/contact_message", async (req, res) => {

//   try {

//     const { name, email, subject, message } = req.body;

//     await exe(
//       `
//       INSERT INTO contact_messages
//       (
//         name,
//         email,
//         subject,
//         message
//       )
//       VALUES
//       (
//         ?,
//         ?,
//         ?,
//         ?
//       )
//       `,
//       [
//         name,
//         email,
//         subject,
//         message
//       ]
//     );

//     res.json({
//       success: true,
//       message: "Message Saved"
//     });

//   } catch (err) {

//     console.log(err);

//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// });
// router.get("/contact_messages", async (req, res) => {

//   const messages = await exe(
//     "SELECT * FROM contact_messages ORDER BY id DESC"
//   );

//   res.render("admin/contact_messages", { messages });
// });
// // Update Working Process
// router.post("/workingprocess/edit/:id", async (req, res) => {

//   try {

//     const id = req.params.id;

//     const old = (
//       await exe(
//         `
//         SELECT *
//         FROM workingprocess
//         WHERE workingprocess_id=?
//         `,
//         [id]
//       )
//     )[0];

//     let image = old.image;

//     if (req.files && req.files.image) {

//       const file = req.files.image;

//       image =
//         Date.now() +
//         "_" +
//         file.name.replace(/\s+/g, "_");

//       await file.mv(
//         path.join(uploadDir, image)
//       );
//     }

//     await exe(
//       `
//       UPDATE workingprocess
//       SET
//         title=?,
//         name=?,
//         image=?
//       WHERE workingprocess_id=?
//       `,
//       [
//         req.body.title,
//         req.body.name,
//         image,
//         id
//       ]
//     );

//     res.redirect("/admin/workingprocess_list");

//   } catch (err) {

//     console.log(err);
//     res.send("Working Process Update Error");
//   }
// });


// // =====================================================
// // ===================== SLIDER API ====================
// // =====================================================

// router.get("/slider_api", async (req, res) => {

//   try {

//     const sliders = await exe(
//       `
//       SELECT *
//       FROM slider
//       ORDER BY slider_id DESC
//       `
//     );

//     const data = sliders.map((s) => ({

//       slider_id: s.slider_id,

//       title: s.title,

//       image1: s.image1
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image1}`
//         : null,

//       image2: s.image2
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image2}`
//         : null,

//       image3: s.image3
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image3}`
//         : null,

//       image4: s.image4
//         ? `${req.protocol}://${req.get("host")}/uploads/${s.image4}`
//         : null,

//     }));

//     res.json(data);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Slider API Error"
//     });
//   }
// });


// // =====================================================
// // =============== WORKING PROCESS API =================
// // =====================================================

// router.get("/workingprocess_api", async (req, res) => {

//   try {

//     const processes = await exe(
//       `
//       SELECT *
//       FROM workingprocess
//       ORDER BY workingprocess_id ASC
//       `
//     );

//     const data = processes.map((p) => ({

//       workingprocess_id: p.workingprocess_id,

//       title: p.title,

//       name: p.name,

//       image: p.image
//         ? `${req.protocol}://${req.get("host")}/uploads/${p.image}`
//         : null

//     }));

//     res.json(data);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Working Process API Error"
//     });
//   }
// });


// // =====================================================
// // ==================== EXPORT =========================
// // =====================================================

// module.exports = router;



const express = require("express");
const router = express.Router();

const exe = require("../connection");
const path = require("path");
const fs = require("fs");

// ================= UPLOAD DIR =================

const uploadDir = path.join(__dirname, "..", "public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ================= LOGIN CHECK =================

const checkLogin = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

// ================= LOGIN PAGE =================
// ================= LOGIN PAGE =================
router.get("/login", (req, res) => {
  res.render("admin/login");
});


// ================= LOGIN POST =================
router.post("/login", async (req, res) => {
  try {

    console.log(req.body); // DEBUG

    const { username, password } = req.body;

    const admin = await exe(
      "SELECT * FROM admins WHERE username=? AND password=?",
      [username, password]
    );

    if (admin.length > 0) {
      req.session.admin = admin[0];
      return res.redirect("/admin");
    } else {
      return res.render("admin/login", {
        error: "Invalid username or password"
      });
    }

  } catch (err) {
    console.log("REAL ERROR:", err);
    res.send("Login Error");
  }
});
// ================= LOGOUT =================

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});

// ================= DASHBOARD =================

router.get("/", checkLogin, async (req, res) => {
  try {
    const sliderCount = await exe("SELECT COUNT(*) as count FROM slider");
    const serviceCount = await exe("SELECT COUNT(*) as count FROM services");
    const machineCount = await exe("SELECT COUNT(*) as count FROM machine");
    const plantCount = await exe("SELECT COUNT(*) as count FROM plants");
    const workprocessCount = await exe("SELECT COUNT(*) as count FROM workingprocess");

    res.render("admin/index", {
      sliders: sliderCount[0].count,
      services: serviceCount[0].count,
      machines: machineCount[0].count,
      plants: plantCount[0].count,
      workingprocesses: workprocessCount[0].count
    });

  } catch (err) {
    console.log(err);
    res.send("Dashboard Error");
  }
});

// ================= SLIDER =================

router.get("/slider", checkLogin, async (req, res) => {
  const sliders = await exe("SELECT * FROM slider ORDER BY slider_id DESC");
  res.render("admin/slider", { sliders });
});

router.post("/slider", checkLogin, async (req, res) => {
  try {
    const title = req.body.title;

    let image1 = "", image2 = "", image3 = "", image4 = "";

    if (req.files?.image1) {
      const f = req.files.image1;
      image1 = Date.now() + "_1_" + f.name.replace(/\s+/g, "_");
      await f.mv(path.join(uploadDir, image1));
    }

    if (req.files?.image2) {
      const f = req.files.image2;
      image2 = Date.now() + "_2_" + f.name.replace(/\s+/g, "_");
      await f.mv(path.join(uploadDir, image2));
    }

    if (req.files?.image3) {
      const f = req.files.image3;
      image3 = Date.now() + "_3_" + f.name.replace(/\s+/g, "_");
      await f.mv(path.join(uploadDir, image3));
    }

    if (req.files?.image4) {
      const f = req.files.image4;
      image4 = Date.now() + "_4_" + f.name.replace(/\s+/g, "_");
      await f.mv(path.join(uploadDir, image4));
    }

    await exe(
      "INSERT INTO slider(title,image1,image2,image3,image4) VALUES (?,?,?,?,?)",
      [title, image1, image2, image3, image4]
    );

    res.redirect("/admin/slider_list");

  } catch (err) {
    console.log(err);
    res.send("Slider Save Error");
  }
});

router.get("/slider_list", checkLogin, async (req, res) => {
  const sliders = await exe("SELECT * FROM slider ORDER BY slider_id DESC");
  res.render("admin/slider_list", { sliders });
});

// ================= WORKING PROCESS =================

router.get("/workingprocess", checkLogin, async (req, res) => {
  const processes = await exe("SELECT * FROM workingprocess ORDER BY workingprocess_id DESC");
  res.render("admin/workingprocess", { processes });
});

router.post("/workingprocess", checkLogin, async (req, res) => {
  try {
    const { title, name } = req.body;

    let image = "";

    if (req.files?.image) {
      const f = req.files.image;
      image = Date.now() + "_" + f.name.replace(/\s+/g, "_");
      await f.mv(path.join(uploadDir, image));
    }

    await exe(
      "INSERT INTO workingprocess(title,name,image) VALUES (?,?,?)",
      [title, name, image]
    );

    res.redirect("/admin/workingprocess");

  } catch (err) {
    console.log(err);
    res.send("Working Process Error");
  }
});



router.get("/workingprocess_list", checkLogin, async (req, res) => {
  const processes = await exe("SELECT * FROM workingprocess ORDER BY workingprocess_id DESC");
  res.render("admin/workingprocess_list", { processes });
});

router.post("/workingprocess/edit/:id", checkLogin, async (req, res) => {
  const id = req.params.id;

  const old = (await exe("SELECT * FROM workingprocess WHERE workingprocess_id=?", [id]))[0];

  let image = old.image;

  if (req.files?.image) {
    const f = req.files.image;
    image = Date.now() + "_" + f.name.replace(/\s+/g, "_");
    await f.mv(path.join(uploadDir, image));
  }

  await exe(
    "UPDATE workingprocess SET title=?, name=?, image=? WHERE workingprocess_id=?",
    [req.body.title, req.body.name, image, id]
  );

  res.redirect("/admin/workingprocess_list");
});


router.get("/contact_list", async (req, res) => {
  try {

    const contacts = await exe(
      "SELECT * FROM contact ORDER BY contact_id DESC"
    );

    res.render("admin/contact_list", { contacts });

  } catch (err) {
    console.log(err);
    res.send("Contact List Error");
  }
});




router.get("/contact/delete/:id", async (req, res) => {
  try {

    await exe(
      "DELETE FROM contact WHERE contact_id=?",
      [req.params.id]
    );

    res.redirect("/admin/contact_list");

  } catch (err) {
    console.log(err);
    res.send("Delete Error");
  }
});





router.get("/contact", async (req, res) => {
  try {
    res.render("admin/contact");
  } catch (err) {
    console.log(err);
    res.send("Contact Page Error");
  }
});








router.post("/contact", async (req, res) => {
  try {

    const { name, email, number, mobile, address } = req.body;

    let image = "";

    if (req.files && req.files.image) {

      const file = req.files.image;

      image = Date.now() + "_" + file.name.replace(/\s+/g, "_");

      await file.mv(
        path.join(__dirname, "..", "public", "uploads", image)
      );
    }

    await exe(
      `INSERT INTO contact
      (name, email, number, mobile, address, image)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, number, mobile, address, image]
    );

    res.redirect("/admin/contact_list");

  } catch (err) {
    console.log(err);
    res.send("Contact Save Error");
  }
});















// ================= API =================

router.get("/slider_api", async (req, res) => {
  const data = await exe("SELECT * FROM slider");

  res.json(
    data.map(s => ({
      ...s,
      image1: s.image1 ? `${req.protocol}://${req.get("host")}/uploads/${s.image1}` : null,
      image2: s.image2 ? `${req.protocol}://${req.get("host")}/uploads/${s.image2}` : null,
      image3: s.image3 ? `${req.protocol}://${req.get("host")}/uploads/${s.image3}` : null,
      image4: s.image4 ? `${req.protocol}://${req.get("host")}/uploads/${s.image4}` : null,
    }))
  );
});

router.get("/workingprocess_api", async (req, res) => {
  const data = await exe("SELECT * FROM workingprocess");

  res.json(
    data.map(p => ({
      ...p,
      image: p.image ? `${req.protocol}://${req.get("host")}/uploads/${p.image}` : null
    }))
  );
});

// ================= EXPORT =================

module.exports = router;