# Simple Pagination Plugin in Javascript / jQuery

## Getting Started

In various front-end application developers intend to paginate table data / data list in their own custom theme without refreshing the page. For such circumstances, 
my pagination plugin can be used easily. [see demo](https://projects.sabbirrupom.com/rpm-pagination/)

### Prerequisites

Before you begin, you need following things to be loaded beforehand:

* jQuery 2+ 
* Bootstrap CSS 3+

## Usage

Include the (minified) JavaScript Templates script in your HTML markup:

```html
<script src="pagination.min.js"></script>
```

Then initialize the plugin function with you pagination item as below:

```js
$('[ pagination-menu-holder ]').rpmPagination({ domElement: '[ pagination-item ]' });
```

Here,
* [ pagination-menu-holder ] => any suitable html tag [ e.g `<ul>` ] or id [ e.g `#custom_pagination` ] or class [ e.g `.custom-pagimation` ]
* [ pagination-item ] => Pagination items which are to be viewed in pagination

## Options

Option parameters are as follows:

### domElement

- Type: `string`
- Optional: No

Parent elements of a pagination item which are to be viewed in pagination

### limit

- Type: `integer`
- Optional: Yes
- Default: 10

Pagination items limit which are to be displayed in each pagination

### total

- Type: `integer`
- Optional: Yes
- Default: [ no default value at particular. total `domElement` are counted ]

## Sample Template

```html
<div class="page-item"></div>
<div class="page-item"></div>
<div class="page-item"></div>
<div class="page-item"></div>
<div class="page-item"></div>
<div class="page-item"></div>

<ul class="pagination custom-pagination"></ul>

<script>
    $(document).ready(function () {
        $('.custom-pagination').rpmPagination({
            limit: 3,
            total: 6,
            domElement: '.page-item'
        });
    });
</script>
```

## Browser Support

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Author

* **Sabbir Hossain (Rupom)** - *Web Developer* - [https://sabbirrupom.com/](https://sabbirrupom.com/)

[⬆ back to top](#table-of-contents)
