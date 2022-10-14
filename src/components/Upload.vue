<template>
  <div style="width: 90%; margin: 0 auto;">
    <nav id="nav">满文识别系统</nav>
    <el-row id="content">
      <el-col :span="8" :xs="24" :sm="24" :md="8" class="leftPart">
        <el-row class="leftPart-button">
          <input type="file" accept="image/*" style="display: none" ref="iptFile" @change="onChangeFile" />
          <el-col :span="10" :offset="1">
            <el-button type="primary" class="button" @click="$refs.iptFile.click()"><i
                class="el-icon-plus el-icon--right" style="margin-right: 5px;"></i>选择图片</el-button>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-button type="primary" class="button" @click="upload"><i class="el-icon-upload el-icon--right"
                style="margin-right: 5px;"></i>上传图片</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16" :xs="24" :sm="24" :md="16" class="rightPart">
        <el-image :src="src" style="width: 100%; height:100%;">
          <div slot="placeholder" class="image-slot">
            <el-image :src="src"></el-image>
          </div>
        </el-image>
      </el-col>
    </el-row>
    <footer id="footer">
      拓展链接：<a target="_blank" href="http://www.manchu.work/home">manchu.work</a>
    </footer>
  </div>
</template>
<script>
import manchuImage from "../assets/images/manchu.jpg";
export default {
  name: 'UserAvatar',
  data() {
    return {
      uploadUrl: '/upload',
      avatar: '',
      dialogVisible: false,
      result: '',
      fileName: '',
      src: manchuImage
    }
  },
  methods: {
    // 获取图片
    onChangeFile(e) {
      const fileList = e.target.files
      if (fileList.length > 0) {
        // 选择了图片
        console.log(fileList[0])
        this.fileName = fileList[0].name
        // 校验图片大小
        const isLt2M = fileList[0].size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.warning('上传的图片大小不能超过5M！')
          return
        }
        // 将图片转化为base64的字符串  FileReader
        const reader = new FileReader()
        // readAsDataURL将文件对象的数据读取到reader中，转化为base64的字符串
        reader.readAsDataURL(fileList[0])
        // load监听读取完成  reader.result
        reader.addEventListener('load', () => {
          //console.log(reader.result)
          this.avatar = reader.result
        })
      } else {
        this.avatar = ''
      }
    },
    upload() {
      //let file = this.$refs.iptFile.files[0]
      if (this.avatar === '') {
        this.$message.warning('请选择图片后再上传！')
        return
      }
      let param = new FormData(); //创建form对象
      param.append('image', this.avatar);//通过append向form对象添加数据
      param.append('fileName', this.fileName);
      this.$http.post(this.uploadUrl, param).then(response => {
        if (response.data) {
          this.result = response.data
        }
        this.dialogVisible = true
        console.log('上传成功')
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  height: 60px;
  background-color: #93B874;
  font-family: cursive, Tahoma, Geneva, Verdana, sans-serif;
  font-size: xx-large;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

#content {
  background-color: grey;
}

#footer {
  height: 30px;
  background-color: #93B874;
  text-align: end;
  padding-right: 10px;
  padding-top: 10px;
}

.leftPart {}

.leftPart-button {
  padding-top: 10px;
  padding-bottom: 10px;
}

.rightPart {
  height: 100%;
}

.btn-box {}

.preview {
  object-fit: contain;
  width: 350px;
  height: 350px;
}
</style>
