import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import MenuItem from "../../components/MenuItem";
import WrapperMenu from "../../components/WrapperMenu";
import PaginatedItems from "./components/PaginatedItems";
import style from "./NewExplore.module.scss";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style);

function NewExplore() {
  const {id} = useParams();
  console.log(id)
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectOption1, setSelectOption1] = useState(id);
  const [selectOption2, setSelectOption2] = useState();
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/api/category/get-all", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setGenres(result.result);
      });
  },[]);
  const renderOptionGenres = () => {
    return genres.map((item, index) => {
      return (
        <option value={item.id} key={index}>
          {item.cateName}
        </option>
      );
    });
  };
  useEffect(() => {
    fetch("http://localhost:8081/api/book/get-explore-page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({
        pageNumber: page,
        pageSize: 10,
        filter: {
          bookAuthor: searchTerm,
          categoryId: selectOption1,
          rating: selectOption2,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result.result);
        setPageCount(Math.ceil(result.dataCount / 10));
      });
  }, [page, searchTerm, selectOption1, selectOption2, id]);

  const handleChangePage = (currentPage) => {
    setPage(currentPage);
  };
  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value.trim());
    setAuthors(
      data
        .map((book) => book.bookAuthor)
        .filter((author, index, authors) => {
          return authors.indexOf(author) === index;
        })
    );

    if (value) {
      setSuggestions(
        authors.filter((item) => {
          return item.toLowerCase().includes(value.toLowerCase());
        })
      );
    } else {
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = (author, e) => {
    e.preventDefault();
    setSearchTerm(author);
    setSuggestions([]); // Xóa gợi ý sau khi chọn
  };

  return (
    <div>
      <div className={cx("filterBar")}>
        <select
          value={selectOption1}
          onChange={(e) => setSelectOption1(e.target.value)}
        >
          <option value={""}>--Chọn thể loại--</option>
          {renderOptionGenres()}
        </select>
        <Tippy
          placement="bottom-end"
          visible={suggestions.length > 0}
          interactive
          render={() => {
            return suggestions.length > 0 ? (
              <WrapperMenu>
                <ul className={cx("wrapperSug")}>
                  <li>
                    <p>Tác giả</p>
                  </li>
                  {suggestions.map((item, index) => (
                    <MenuItem
                      key={index}
                      nameItem={item}
                      suggestItem
                      onClick={(e) => handleSuggestionClick(item, e)} // Gọi hàm khi click
                      notLink
                    ></MenuItem>
                  ))}
                </ul>
              </WrapperMenu>
            ) : null; // Không render gì nếu không có gợi ý
          }}
        >
          <input
            placeholder="Nhập tên tác giả"
            value={searchTerm}
            onChange={(e) => handleChangeInput(e)}
          ></input>
        </Tippy>
        <select
          value={selectOption2}
          onChange={(e) => setSelectOption2(e.target.value)}
        >
          <option value={""}>--Đánh giá--</option>
          <option value={1}>1 sao</option>
          <option value={2}>2 sao</option>
          <option value={3}>3 sao</option>
          <option value={4}>4 sao</option>
          <option value={5}>5 sao</option>
        </select>
      </div>
      <div className={cx("containerBooks")}>
        {data.length > 0 ? (
          <PaginatedItems
            items={data}
            pageCount={pageCount}
            onPageChange={handleChangePage}
          />
        ) : (
          <div>
            <i>Không có sách phù hợp với bộ lọc!</i>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewExplore;
