from flask import Flask,request,make_response,jsonify
#from flask_restful import Resource,Api
from flask_cors import CORS
from functools import wraps
import pymysql

app=Flask(__name__)
#api = Api(app)
cors=CORS(app)

@app.route('/book', methods=['GET'])
def get():
    conn=pymysql.connect(host='localhost',user='root',password='',db='bookstore')
    cur=conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("SELECT * FROM book_details")
    output=cur.fetchall()

    for x in output:
        print(x)

    conn.close()
    return jsonify(output);

@app.route('/bookedit', methods=['GET'])
def edit():
    conn=pymysql.connect(host='localhost',user='root',password='',db='bookstore')
    cur=conn.cursor(pymysql.cursors.DictCursor)
    b_id=int(request.args.get('bk_id'))
    sql=f"SELECT * FROM book_details where bk_id={b_id}"
    cur.execute(sql)
    output=cur.fetchall()
    for s in output:
        print(s)
    conn.close()
    return jsonify(output)

@app.route('/book', methods=['DELETE'])
def delete():
    conn=pymysql.connect(host='localhost',user='root',password='',db='bookstore')
    cur=conn.cursor(pymysql.cursors.DictCursor)
    b_id=int(request.args.get('bk_id'))
    sql=f"DELETE FROM book_details where bk_id={b_id}"
    cur.execute(sql)
    output=cur.fetchall()
    conn.commit()
    print(cur.rowcount, "row deleted")
    return jsonify("Record deleted succesfully")

@app.route('/book', methods=['POST'])
def insert():
    conn=pymysql.connect(host='localhost',user='root',password='',db='bookstore')

    raw_json=request.get_json()
    b_id=raw_json['bk_id']
    b_name=raw_json['bk_name']
    publ=raw_json['publisher']
    auth=raw_json['author']
    price=raw_json['price']
    type=raw_json['type']

    sql=f"INSERT INTO book_details (bk_id,bk_name,publisher,author,price,type) VALUES('"+b_id+"', '"+b_name+"','"+publ+"','"+auth+"','"+price+"','"+type+"')"
    cur=conn.cursor()
    cur.execute(sql)
    conn.commit()
    return jsonify("Record inserted succesfully")

@app.route('/book', methods=['PUT'])
def update():
    conn=pymysql.connect(host='localhost',user='root',password='',db='bookstore')
    raw_json=request.get_json()

    b_id=raw_json['bk_id']
    b_name=raw_json['bk_name']
    publ=raw_json['publisher']
    auth=raw_json['author']
    price=raw_json['price']
    type=raw_json['type']

    sql_upd=f"UPDATE book_details SET bk_name='"+b_name+"', publisher='"+publ+"', author='"+auth+"',price='"+price+"',type='"+type+"' WHERE bk_id='"+str(b_id)+"'"
    cur=conn.cursor()
    cur.execute(sql_upd)
    conn.commit()
    return jsonify("Record updated succesfully")

if __name__=="__main__":
    app.run(host="0.0.0.0",port=int("1234"),debug=True)

