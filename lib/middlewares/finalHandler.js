/* eslint no-param-reassign: 0 */
export default function finalHandler() {
  return async (ctx, next) => {
    await next();
  };
}
