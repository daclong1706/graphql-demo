import Publisher from "../models/Publisher.js";

const publisherService = {
  addPublisher: async (args) => {
    const publisher = new Publisher(args);
    return await publisher.save();
  },
  updatePublisher: async (id, updateData) => {
    return await Publisher.findByIdAndUpdate(id, updateData, { new: true });
  },
  deletePublisher: async (id) => {
    return await Publisher.findByIdAndDelete(id);
  },
  getPublishers: async () => await Publisher.find(),
  getPublisherById: async (id) => await Publisher.findById(id),
};

export default publisherService;
