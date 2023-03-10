const db = require("../models");
const Boom = require("@hapi/boom");

const Orders = db.orders;

const OrderController = {
  async addOrder(request, h) {
    try {
      const { product_name, order_date, amount } = request.payload;
      const order = await Orders.create({ product_name, order_date, amount });
      return h.response(order).code(201);
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async getOrder(request, h) {
    try {
      const { page = 1, limit = 5 } = request.query;
      const offset = (page - 1) * limit;
      const order = await Orders.findAll({
        attributes: ["id", "product_name", "order_date", "amount"],
        limit: limit,
        offset: offset,
      });
      const totalCount = await Orders.count();
      const totalPages = Math.ceil(totalCount / limit);

      return h
        .response({
          data: order,
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalCount,
        })
        .code(200);
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async getOrderById(request, h) {
    try {
      const { id } = request.params;
      const order = await Orders.findByPk(id, {
        attributes: ["id", "product_name", "order_date", "amount"],
      });
      if (!order) {
        return Boom.notFound(`Order with id ${id} not found`);
      } else {
        return h.response(order).code(200);
      }
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async udpateOrder(request, h) {
    try {
      const { id } = request.params;
      const order = await Orders.findByPk(id);
      if (!order) {
        return Boom.notFound(`Order with id ${id} not found`);
      } else {
        const { product_name, order_date, amount } = request.payload;
        await Orders.update(
          { product_name, order_date, amount },
          { where: { id } }
        );
        return "Successfully Updated";
      }
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async deleteOrder(request, h) {
    try {
      const { id } = request.params;
      const order = await Orders.findByPk(id);
      if (!order) {
        return Boom.notFound(`Order with id ${id} not found`);
      } else {
        await Orders.destroy({ where: { id } });
        return "Successfully Deleted";
      }
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
};

module.exports = OrderController;
