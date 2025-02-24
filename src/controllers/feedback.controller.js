const Account = require("../models/accounts");
const Feedback = require("../models/feedbacks");
const mongoose = require("mongoose");

class FeedbackController {
  getList(req, res, next) {
    const { productId } = req.params;

    // Tạo bộ lọc để tìm phản hồi dựa trên productId
    const filter = {
      $or: [
        { accessory_id: productId },
        { shoes_id: productId },
        { pant_id: productId },
        { tshirt_id: productId },
      ],
    };

    Feedback.find(filter)
      .populate("account_id")
      .then((feedback) => {
        res.json(feedback);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error retrieving feedback", error });
      });
  }

  getListFeedback(req, res, next) {
    Feedback.find({})
      .then((feedback) => {
        res.json(feedback);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async create(req, res, next) {
    Feedback.create(req.body)
      .then((data) => {
        console.log(data);

        res.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(req, res, next) {
    Feedback.updateOne({ _id: req.params.feedbackId }, req.body)
      .then(() => {
        res.send("Update discount successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delete(req, res, next) {
    Feedback.deleteOne({ _id: req.params.feedbackId })
      .then(() => {
        res.send("Delete discount successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async like(req, res, next) {
    // let like = req.body?.like;
    try {
      let account_id = req.body?.account_id;

      let user = await Account.findOne({ _id: account_id });
      let feedbackId = new mongoose.Types.ObjectId(req.params.feedbackId);

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // console.log("Before update:", user.feedback_id);

      const exists = user.feedback_id.some((id) => id.equals(feedbackId));
      if (!exists) {
        user.feedback_id.push(feedbackId);
      } else {
        user.feedback_id = user.feedback_id.filter(
          (id) => !id.equals(feedbackId)
        );
      }

      // console.log("After update:", user.feedback_id);

      await user.save();
      // console.log(user, req.params.feedbackId);
      res.send(user);
    } catch (error) {
      console.log(error);
    }

    // Feedback.updateOne({ _id: req.params.feedbackId }, { like: !like })
    //   .then((data) => {
    //     res.send("Update like successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}

module.exports = new FeedbackController();
