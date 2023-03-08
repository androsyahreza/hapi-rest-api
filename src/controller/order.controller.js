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
  async getProduct(request, h) {
    try {
      const order = await Orders.findAll({
        attributes: ["id", "product_name", "order_date", "amount"],
      });
      return h.response(order).code(200);
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async getProductById(request, h) {
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
  async udpateProduct(request, h) {
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
