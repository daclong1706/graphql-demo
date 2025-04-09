import Publisher from "../models/Publisher.js";

const publisherService = {
  addPublisher: async (args) => {
    const publisher = new Publisher(args);
    return await publisher.save();
  },
  getPublishers: async () => await Publisher.find(),
  getPublisherById: async (id) => await Publisher.findById(id),
};

export default publisherService;
