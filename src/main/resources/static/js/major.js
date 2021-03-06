var Major = {
		template : `
		<div>
			<el-button type="primary" icon="el-icon-edit" class="addButton" @click="AddMajor">增加专业</el-button>
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
		    
		     /*专业号*/
		    <el-table-column
		      prop="id"
		      label="专业号"
		      width="120">
		    </el-table-column>
		    
		     /*专业名*/
		    <el-table-column
		      prop="name"
		      label="专业名"
		      width="120">
		    </el-table-column>
		    
		    /*学院*/
		    <el-table-column
		      prop="college.name"
		      label="学院"
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
	    
	      @current-change="handleCurrentChange"
	      :current-page.sync="currentPage"
	      :page-size="pagesize"
	       background
	      layout="total,prev, pager, next, jumper"
	      :total="allnum">
	    </el-pagination>
		
		
		<el-dialog title="专业信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
	
		    <el-form-item label="专业名" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="所属学院" :label-width="formLabelWidth">
		      <el-select v-model="form.college.id" placeholder="请选择活动区域">
			       <el-option label="计算机学院"  value="1"></el-option>
			       <el-option label="外国语学院"  value="2"></el-option>
			       <el-option label="土木学院"  value="3"></el-option>
			       <el-option label="材料学院"  value="4"></el-option>
			  </el-select>
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
					 /*分页是否打开*/
				        hidevalue:false,
				        currentPage:1,
				        allnum:4,
				        /*每一页的数量*/
				        pagesize:5,
				        multipleSelection: [],
				        search: '',
				         /*弹框是否打开*/
				        dialogFormVisible: false,
				        form: {
				        	id:'',
				            name: '',
				            college:{'id':1},
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
		    			axios.post('/major/major',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadMajors();
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
		    			axios.put('/major/major',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadMajors();
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
		    			this.form=this.tableData[index];
		    		}
		        },
		        handleDelete(index, row) {
		            console.log(index, row);
		            console.log(row.id);
		            axios.delete('/major/major/'+row.id).then(res=>{
		            	  console.log(res);
					       res = res.data;
					       if(res.result){
					         this.loadMajors();
					         
					         if(res.result){
						         this.loadMajors();
						         this.$notify({
						             title: '成功',
						             message: '成功删除专业',
						             type: 'success'
						           });
						       }
					         
					       }
//					       alert(res.msg);   //显示提示信息
					     }).catch(err=>{
					       console.log(err);
					       alert('网络请求异常，请重试!');
					     });
		        },
		        /*页面修改数据*/
		        handleCurrentChange(val){
//		        	console.log(val);
		        	/*开始数据 页数*每一页的数量*/
		        	let st=this.pagesize*(val-1);
		        	let et=st+this.pagesize;
		        	this.pageData=this.tableData.slice(st,et);
		        },
		        AddMajor(){
		        	 if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form={
				        	id:'',
				            name: '',
				            college:{'id':'','name':''}
				        };
		    			this.status=1;
			    	}
		        },
		        loadMajors(){
		        	axios.get("/major/major").then(res=>{ //res 是返回对象
						res = res.data;
						var returnData=res.rows;
						var len=returnData.length;
						
						//console.log(res);
						if(res.result === true){
							this.tableData = res.rows;
							
							/*修改表格显示数据 与总的页数*/
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
		    	this.loadMajors();
		      }
}