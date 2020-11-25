# Simple Pagination Plugin in jQuery / Bootstrap [ V2.1.1 ]

## Getting Started

In various front-end application developers intend to paginate tabular data / data list in their own custom way.

* sometimes, without page refresh for fast user interactivity
* sometimes, in a regular pagination with page refresh by sending limit/offset query strings
* sometimes, with searchable form parameters 

For such circumstances, my pagination plugin can be used easily. [see demo](https://projects.sabbirrupom.com/rpm-pagination/)

### Prerequisites

Before you begin, you need following things to be loaded beforehand:

* jQuery 2+ [ tested upto 3.4.1+ ]
* Bootstrap CSS 3+ [ tested upto 4.3.1+ ]

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
* [ pagination-item ] => Pagination item elements which are to be viewed in pagination

## Options

Option parameters are as follows:

### domElement

- Type: `string`
- Optional: No, if refresh flag is disabled

Common class element for all tabular data items. The items of the active pagination number will be shown, other class elements will be kept hidden  
[see demo](https://projects.sabbirrupom.com/rpm-pagination/test/example-1.html

### limit

- Type: `integer`
- Optional: Yes
- Default: 10

Pagination items limit which are to be displayed in each pagination

### currentPage

- Type: `integer`
- Optional: Yes
- Default: 1

If provided, corresponding pagination menu link will be set to active

### total

- Type: `integer`
- Optional: Yes
- Default: total `domElement` are counted, if refresh flag is disabled

Total number of page items for pagination

### refresh

- Type: `boolean`
- Optional: Yes
- Default: false 

Refresh flag enables page refresh with limit/offset parameters to pass alongside [ GET / POST ]

### link

- Type: `string`
- Optional: No, if `refresh` flag is enabled and search `formElement` is not set. optional otherwise  

Page refresh link where server will fetch data according to limit and offset parameter which is sent as get query string 
[see demo](https://projects.sabbirrupom.com/rpm-pagination/test/example-2.html)

### formElement

- Type: `string`
- Optional: Yes

User can set this parameter with pagination configuration to point out the custom item search filter form (if exists)
if configured with valid form identifier element, search form will be submitted to form action url along with limit / offset parameter from
pagination menu link. 
[see demo](https://projects.sabbirrupom.com/rpm-pagination/test/example-3.html)

## Sample Template

```html
<div class="page-item">content 1</div>
<div class="page-item">content 2</div>
<div class="page-item">content 3</div>
<div class="page-item">content 4</div>
<div class="page-item">content 5</div>
<div class="page-item">content 6</div>

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

# Changelog
## [2.1.1] - 2020-11-26
### Updated
- javascript statement issue fix
- version updated
- test php script bug is fixed

## [2.1] - 2020-05-01
### Updated
- pagination bug fixed for last page items
### Added
- test examples added
- ES6 standard is followed

## [2.0] - 2020-01-01
### Added
- bootstrap 4 support added

## [1.0] - 2019
### Added
- project initialized

## Author

* **Sabbir Hossain (Rupom)** - *Web Developer* - [https://sabbirrupom.com/](https://sabbirrupom.com/)

[⬆ back to top](#topics-list-container)
