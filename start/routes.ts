import Route from '@ioc:Adonis/Core/Route'

const category = {store: ['auth', 'admin'], destroy: ['auth', 'admin'], update: ['auth', 'admin']}
const product = {create: ['auth', 'admin'], edit: ['auth', 'admin'], store: ['auth', 'admin'], destroy: ['auth', 'admin'], update: ['auth', 'admin']}
const blog = {create: ['auth', 'admin'], edit: ['auth', 'admin'], store: ['auth', 'admin'], destroy: ['auth', 'admin'], update: ['auth', 'admin']}

Route.get('/', 'DataController.main')
Route.get('contact', 'DataController.contact')
Route.get('before-buy', 'DataController.beforeBuy')
Route.get('shipping-return', 'DataController.shippingReturn')
Route.get('measure', 'DataController.measure')
Route.get('faq', 'DataController.faq')

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('verify', 'AuthController.verify')
  Route.get('logout', 'AuthController.logout')
}).prefix('auth')

// Slug
Route.get('blog/post/:id/:slug', 'BlogsController.slug').as('blog.slug')
Route.get('category/:slug', 'CategoriesController.slug').as('category.slug')
Route.get('product/:id/:slug', 'ProductsController.slug').as('product.slug')

// Resource
Route.resource('xproduct', 'ProductsController').middleware(product)
Route.resource('xcategory', 'CategoriesController').middleware(category)
Route.resource('blog', 'BlogsController').middleware(blog).except(['show'])

// Product
Route.get('xproduct/model/:m', 'ProductsController.model').as('product.model')
Route.post('xproduct/list', 'ProductsController.list').middleware('auth').as('product.list')
Route.get('xproduct/:pid/heart', 'ProductsController.heart').middleware('auth').as('product.heart')
Route.post('xproduct/comment/:cid/like', 'ProductsController.like').middleware('auth').as('product.like')
Route.post('xproduct/:pid/comment', 'ProductsController.comment').middleware('auth').as('product.comment')
Route.post('xproduct/:pid/favourite', 'ProductsController.favourite').middleware('auth').as('product.favourite')
Route.post('xproduct/:pid/photos', 'ProductsController.photos').middleware('auth').middleware('admin').as('product.photos')
Route.post('xproduct/photo', 'ProductsController.photo').middleware('auth').middleware('admin').as('product.photo')
Route.delete('xproduct/:pid/photos/:id', 'ProductsController.delete').middleware('admin').middleware('auth').as('product.delete')
Route.get('xproduct/:pid/duplicate', 'ProductsController.duplicate').middleware('auth').middleware('admin').as('product.duplicate')
Route.put('xproduct/:pid/description', 'ProductsController.description').middleware('auth').middleware('admin').as('product.description')

// Category
Route.post('xcategory/:category/photo', 'CategoriesController.photo').middleware('auth').middleware('admin').as('category.photo')

//Order
Route.get('basket', 'OrdersController.basket')
Route.post('callback', 'OrdersController.callback')
Route.get('bags', 'OrdersController.bags').middleware('auth')
Route.get('pay', 'OrdersController.pay').middleware('auth')
Route.post('pay', 'OrdersController.repay').middleware('auth')
Route.get('verify', 'OrdersController.verify').middleware('auth')
Route.resource('order', 'OrdersController').middleware({ '*': ['auth'] }).except(['destroy', 'update', 'show' , 'index'])

//Blog
Route.post('blog/photo', 'BlogsController.photo').middleware('auth').middleware('admin').as('blog.photo')
Route.post('blog/photo/delete', 'BlogsController.delete').middleware('auth').middleware('admin').as('blog.delete')

//Data
Route.post('mail', 'DataController.mail')
Route.get('price', 'DataController.price')
Route.get('album', 'DataController.album')
Route.get('search', 'DataController.search')
Route.post('search', 'DataController.finder')


//Profile
Route.group(() => {
  Route.get('user', 'UsersController.user')
  Route.get('xuser', 'UsersController.xuser')
  Route.get('basket', 'UsersController.basket')
  Route.get('information', 'UsersController.information')
  Route.post('information/update', 'UsersController.informationUpdate')
  Route.get('orders', 'UsersController.orders')
  Route.get('orders/:order', 'UsersController.showOrder')
  Route.get('favourites', 'UsersController.favourites')
  Route.get('comments', 'UsersController.comments')
  Route.put('comments/:comment', 'UsersController.updateComment')
  Route.delete('comments/:comment', 'UsersController.destroyComment')
  Route.get('notifications', 'UsersController.notifications')
  Route.delete('notifications', 'UsersController.destroyNotification')
  Route.get('factor/:factor', 'UsersController.showFactor')
}).prefix('profile').middleware('auth')

//partners


//Admin
Route.group(() => {
  Route.get('pay', 'AdminsController.pay')
  Route.post('verify', 'AdminsController.verify')
  Route.post('user/ban', 'AdminsController.ban')
  Route.get('user/:number', 'AdminsController.user')
  Route.get('categories', 'AdminsController.categories')
  Route.get('products', 'AdminsController.products')
  Route.post('product', 'AdminsController.updateProduct')
  Route.get('inventory/:category', 'AdminsController.stockProduct')
  Route.put('category/:category', 'AdminsController.updateCategory')
  Route.get('slides', 'AdminsController.slides')
  Route.post('slide', 'AdminsController.storeSlide')
  Route.delete('slide/:slide', 'AdminsController.destroySlide')
  Route.get('orders', 'AdminsController.orders')
  Route.get('order/:order', 'AdminsController.showOrder')
  Route.put('order/:order', 'AdminsController.updateOrder')
  Route.get('orders/type/:type', 'AdminsController.orderType')
  Route.get('orders/number/:number', 'AdminsController.orderNumber')
  Route.get('comments', 'AdminsController.comments')
  Route.put('comment/:comment', 'AdminsController.updateComment')
  Route.put('comment/:comment/answer', 'AdminsController.answerComment')
}).prefix('admin').middleware('auth').middleware('admin')
