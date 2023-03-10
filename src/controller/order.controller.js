const db = require("../models");
const Boom = require("@hapi/boom");

const Orders = db.orders;

const OrderController = {
  async addOrder(request, h) {
    try {
      const { product_name, order_date, amount, user_id } = request.payload;
      const order = await Orders.create({
        product_name,
        order_date,
        amount,
        user_id,
      });
      return h.response(order).code(201);
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async getProduct(request, h) {
    try {
      const userId = request.auth.credentials.id;
      const { page = 1, limit = 5 } = request.query;
      const offset = (page - 1) * limit;
      const order = await Orders.findAll(
        {
          where: { user_id: userId },
          attributes: ["id", "product_name", "order_date", "amount", "user_id"],
          limit: limit,
          offset: offset,
        },
      );
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
  async getProductById(request, h) {
    try {
      const { id } = request.params;
      const order = await Orders.findByPk(id, {
        attributes: ["id", "product_name", "order_date", "amount", "user_id"],
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
  async udpateProduct(request, h) {
    try {
      const { id } = request.params;
      const order = await Orders.findByPk(id);
      if (!order) {
        return Boom.notFound(`Order with id ${id} not found`);
      } else {
        const { product_name, order_date, amount, user_id } = request.payload;
        await Orders.update(
          { product_name, order_date, amount, user_id },
          { where: { id } }
        );
        return "Successfully Updated";
      }
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async deleteProduct(request, h) {
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
