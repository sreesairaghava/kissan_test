const router = require("express").Router();
const Subscriber = require("../models/subscriber");
/*//TODO:
    Get all subs --> DONE
    Get one sub --> DONE
    Creat one sub --> DONE
    update one Sub --> YET TO DO
    Delete one sub --> DONE
*/

//Get all subs
router.get("/", async (req, res) => {
  try {
    const subScribers = await Subscriber.find();
    res.json(subScribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Hey error is: ${error}`);
  }
});
//Get one sub
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

//Create one Sub
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update one sub
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedChannel != null) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel;
  }
  try {
    const updateSubscriber = await res.subscriber.save();
    res.json(updateSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Delete one sub
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted this Subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//async function to getSub
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cant find Sub" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
