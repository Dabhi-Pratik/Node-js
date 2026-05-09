import User from "../model/UserModel.js";
import Booking from "../model/Booking.js";
import Provider from "../model/provider.js";
import Service from "../model/service.js";

import HttpError from "../middleware/HttpError.js";

const dashBoardStatics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCustomer = await User.countDocuments({ role: "customer" });

    const totalProvider = await User.countDocuments({ role: "Provider" });

    const totalIsApprovedProvider = await Provider.countDocuments({
      isValid: true,
    });

    const totalIsRejectedProvider = await Provider.countDocuments({
      isValid: false,
    });

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const completeBookings = await Booking.countDocuments({
      status: "compete",
    });

    const cancelBookings = await Booking.countDocuments({
      status: "cancel",
    });

    const confirmBookings = await Booking.countDocuments({
      status: "confirm",
    });

    const totalServices = await Service.countDocuments();

    const totalActiveServices = await Service.countDocuments({
      isActive: true,
    });

    const totalDeActiveServices = await Service.countDocuments({
      isActive: false,
    });

    const totalRevenue = await Booking.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalBookingsAggregate = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res
      .status(200)
      .json({
        success: true,
        message: "DashBoard Statics fetched SuccessFully...!",
        totalUsers,
        totalCustomer,
        totalProvider,
        totalIsApprovedProvider,
        totalIsRejectedProvider,
        totalBookings,
        pendingBookings,
        completeBookings,
        cancelBookings,
        confirmBookings,
        totalServices,
        totalActiveServices,
        totalDeActiveServices,
        totalRevenue,
        totalBookingsAggregate,
      });
  } catch (error) {
    next(new HttpError(error.message))
  }
};

export default {dashBoardStatics}
