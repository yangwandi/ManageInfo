var Class = {
		template : `
		/*wrong*/
		<div>
			<el-button type="primary" icon="el-icon-edit" class="addButton" @click="AddCollege">增加班级</el-button>
			<el-table
		    ref="filterTable"
		    :data="pageData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    
		     /*班级号*/
		    <el-table-column
		      prop="id"
		      label="班级号"
		      width="120">
		    </el-table-column>
		    
		     /*班级名*/
		    <el-table-column
		      prop="name"
		      label="班级名"
		      width="120">
		    </el-table-column>
		    
		    /*学院*/
		     <el-table-column
		      prop="major.college.name"
		      label="学院"
		      width="120">
		    </el-table-column>
		    
		     /*专业*/
		     <el-table-column
		      prop="major.name"
		      label="专业"
		      width="120">
		    </el-table-column>
		    
		    
		     <el-table-column
			      align="right">
			      <template slot="header" slot-scope="scope">
			        <el-input
			          v-model="search"
			          size="mini"
			          placeholder="输入关键字搜索"/>
			      </template>
			      
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
			      </template>
			  </el-table-column>
			  <el-button type="text" ></el-button>
			  
		  </el-table>
		
		 <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="pagesize"
	       background
	      layout="total,prev, pager, next, jumper"
	      :total="allnum">
	    </el-pagination>
		
		<el-dialog title="班级信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
	
		    <el-form-item label="班级名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitChange">确 定</el-button>
		</div>
		</el-dialog>
		
		</div>
			`,
			 data: function(){
				 return {
					 tableData: [],
					 pageData:[],
				        multipleSelection: [],
				        hidevalue:false,
				        currentPage:1,
				        allnum:4,
				        /*每一页的数量*/
				        pagesize:5,
				        search: '',
				         /*弹框是否打开*/
				        dialogFormVisible: false,
				        form: {
				        	id:'',
				            name: '',
				            major:{'id':1,'college':{'id':1}},
				        },
				        /*状态为0：修改 状态为1：添加*/
				        status:0,
				        formLabelWidth: '120px',
				}
		    },
		    methods: {
		    	submitChange(){
		    		console.log(this.status);
		    		this.dialogFormVisible = false;

		    		/*如果未添加*/
		    		if(this.status==1){
		    			console.log(this.form);
		    			axios.post('/classes/addClasses',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadColleges();
		    				}else{
		    					  alert(res.msg);
		    				}
		    			}).catch(err=>{
		    				console.error(err);
		    				alert(res.msg);
		    			});
		    		}
		    		/*为修改*/
		    		else{
		    			axios.put('/classes/putClasses',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadColleges();
		    				}else{
		    					  alert(res.msg);
		    				}
		    			}).catch(err=>{
		    				console.error(err);
		    				alert(res.msg);
		    			});
		    		}
		    	},
		        handleSelectionChange(val) {
		          this.multipleSelection = val;
		        },
		        filterHandler(value, row, column) {
		            const property = column['property'];
		            return row[property] === value;
		        },
		        handleEdit(index, row) {
		            //console.log(index, row);
		            if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form=this.pageData[index];
		    		}
		        },
		        /*页面修改数据*/
		        handleCurrentChange(val){
//		        	console.log(val);
		        	/*开始数据 页数*每一页的数量*/
		        	let st=this.pagesize*(val-1);
		        	let et=st+this.pagesize;
		        	this.pageData=this.tableData.slice(st,et);
		        },
		        handleDelete(index, row) {
		            //console.log(index, row);
		            console.log(row.id);
		            axios.delete('/classes/deleteClasses/'+row.id).then(res=>{
		            	  console.log(res);
					       res = res.data;
					       if(res.result){
					         this.loadColleges();
					         
					         this.$notify({
					             title: '成功',
					             message: '成功删除课程',
					             type: 'success'
					           });
					       }
					       alert(res.msg);   //显示提示信息
					     }).catch(err=>{
					       console.log(err);
					       alert('网络请求异常，请重试!');
					     });
		        },
		        AddCollege(){
		        	 if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form={
				        	id:'',
				            name: '',
				            major:{'id':1,'college':{'id':1}},
				        };
		    			this.status=1;
			    	}
		        },
		        loadColleges(){
		        	axios.get("/classes/allClasses").then(res=>{ //res 是返回对象
						res = res.data;
						//console.log(res);
						if(res.result === true){
							this.tableData = res.rows;
							var returnData=res.rows;
							var len=returnData.length;
							
							this.pageData=this.tableData.slice(0,Math.min(this.pagesize,len+1));
							this.allnum=len;
						}else{
							alter(res.msg);   //显示查询错误
						}
					}).catch(err=>{
						console.log(err);
					});
		        }
		      },
		    mounted: function(){
		    	this.loadColleges();
		      }
}