const { Router } = require("express");
const {
  getSynonyms,
  addSyn,
  getSynonym,
  updateSynonym,
  deleteSynonym,
} = require("../controllers/synonym.contoller");

const router = Router();
router.get("/", getSynonyms);
router.post("/", addSyn);

router.get("/:id", getSynonym);
router.put("/:id", updateSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
