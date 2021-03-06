var teachClass = {
		template : `
		<div>
			<el-button type="primary" icon="el-icon-edit" class="addButton" @click="AddCourseTeacher">增加授课</el-button>
			<el-table
		    ref="filterTable"
		    :data="pageData.filter(data => !search || data.teacher.name.toLowerCase().includes(search.toLowerCase()))"
		    tooltip-effect="dark"
		    style="width: 100%"
		    @selection-change="handleSelectionChange">
		    
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    
		     /*课程号*/
		    <el-table-column
		      prop="id"
		      label="编号"
		      width="120">
		    </el-table-column>
		    
		     <el-table-column
		      label="教师"
		      width="180">
		      <template slot-scope="scope">
		        <el-popover trigger="hover" placement="top">
		          <p>姓名: {{ scope.row.teacher.name }}</p>
		          <p>出生日期: {{ scope.row.teacher.birth }}</p>
		          <p>所属学院: {{ scope.row.teacher.college.name }}</p>
		          <p>职称: {{ scope.row.teacher.position }}</p>
		          <div slot="reference" class="name-wrapper">
		            <el-tag size="medium">{{ scope.row.teacher.name }}</el-tag>
		          </div>
		        </el-popover>
		      </template>
		    </el-table-column>
		    
		     <el-table-column
		      label="课程"
		      width="180">
		      <template slot-scope="scope">
		        <el-popover trigger="hover" placement="top">
		          <p>课程名: {{ scope.row.course.name }}</p>
		          <p>学分: {{ scope.row.course.credit }}</p>
		          <p>所属学院: {{ scope.row.course.college.name }}</p>
		          <div slot="reference" class="name-wrapper">
		            <el-tag size="medium">{{ scope.row.course.name }}</el-tag>
		          </div>
		        </el-popover>
		      </template>
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
		
		<el-dialog title="授课信息" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
	
		    <el-form-item label="教师名" :label-width="formLabelWidth">
		      <el-input v-model="form.teacher.name" autocomplete="off"></el-input>
		    </el-form-item>
		  
		    <el-form-item label="课程名" :label-width="formLabelWidth">
		      <el-input v-model="form.course.name" autocomplete="off"></el-input>
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
				        /*分页是否打开*/
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
				            teacher:{'id':'','name':''},
				            course:{'id':'','name':''}
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
		    			axios.post('/courseteacher/addCourseTeacher',this.form).then(res=>{
		    				res = res.data;
//		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadCourseTeacher();
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
		    			console.log(this.form);
		    			axios.put('/courseteacher/putCourseTeacher',this.form).then(res=>{
		    				res = res.data;
		    				console.log(res);
		    				if(res.result === true) {
		    					// 成功后刷新列表
		    					this.loadCourseTeacher();
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
		            axios.delete('/courseteacher/deleteCourseTeacher/'+row.id).then(res=>{
		            	  console.log(res);
					       res = res.data;
					       if(res.result){
					         this.loadCourseTeacher();
					         
					         if(res.result){
						         this.loadStudents();
						         this.$notify({
						             title: '成功',
						             message: '成功删除授课',
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
		        AddCourseTeacher(){
		        	 if(this.dialogFormVisible==false){
		    			this.dialogFormVisible=true;
		    			this.form={
				        	id:'',
				            teacher:{'id':'','name':''},
				            course:{'id':'','name':''}
				        };
		    			this.status=1;
			    	}
		        },
		        loadCourseTeacher(){
		        	axios.get("/courseteacher/allCourseTeacher").then(res=>{ //res 是返回对象
						res = res.data;
						console.log(res);
						
						var returnData=res.rows;
						var len=returnData.length;
						
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
		    	this.loadCourseTeacher();
		      }
}