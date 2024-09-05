<template>
	<div>
        <v-container class="fill-height">
            <v-responsive class="align-centerfill-height mx-auto" max-width="900">
                <v-img class="mb-4" height="100" src="@/assets/logo/logo.png" />
                <div class="text-center mt-10">
                    <div class="text-body-2 font-weight-bold">Welcome to</div>
                    <h1 class="text-h2 font-weight-bold">
                        <span>Merkle Tree </span>
                        <span class="text-primary">Converter</span>
                    </h1>
                    <div class="text-body-2 font-weight-bold mt-5">Easily convert files from <v-kbd>Merkle Tree</v-kbd> to <v-kbd>Merkle Proof</v-kbd>, online.</div>
                </div>
                <div class="py-4" />
                <v-row>
                    <v-col cols="12" align="center">
                        <v-card class="pa-4" color="surface-variant" rounded="lg" variant="outlined">
                            <v-file-input v-model="merkleTreeFile" accept=".json" label="Choose File" :show-size="1024" clearable></v-file-input>
                            <div class="text-body-2 ml-10">Max file size <v-kbd>1 MiB</v-kbd>. 
                                <a href="https://github.com/LouisLiu00/merkle-tree-converter" target="_blank" rel="noopener noreferrer">Star</a>
                                <span> repository on GitHub for more.</span>
                            </div>
                        </v-card>
                        <v-btn rounded="lg" elevation="8" class="text-none text-h5 my-10" color="primary" width="200" height="60" @click="convert()">Convert</v-btn>
                    </v-col>
                </v-row>
            </v-responsive>
            <v-responsive class="align-centerfill-height mx-auto">
                <v-row class="d-flex align-center justify-center">
                    <v-col cols="5">
                        <v-card color="surface-variant" align="center" prepend-icon="mdi-text-box-outline" rounded="lg" title="Merkle Tree" variant="text">
                            <div class="px-4">
                                <pre class="line-numbers" style="height: 500px;">
                                    <code class="language-json">
                                        {{ merkleTreeContent }}
                                    </code>
                                </pre>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="1" align="center">
                        <v-icon color="surface-variant" size="120">mdi mdi-arrow-right-thin</v-icon>
                    </v-col>
                    <v-col cols="5">
                        <v-card color="surface-variant" align="center" prepend-icon="mdi-text-box-outline" rounded="lg" title="Merkle Proof" variant="text">
                            <div class="px-4">
                                <pre class="line-numbers" style="height: 500px;">
                                    <code class="language-json">
                                        {{ merkleProofContent }}
                                    </code>
                                </pre>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-responsive>
            <v-responsive class="align-centerfill-height mt-10 mx-auto" max-width="900">
                <v-row>
                    
                </v-row>
            </v-responsive>
        </v-container>
	</div>
</template>
<script>
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import MerkleTreeDemo from './data/merkle-tree-demo.json';
import MerkleProofDemo from './data/merkle-proof-demo.json';
// import MerkleTreeFile from './data/merkle-tree.json';
export default {
    data(){
        return {
            // 树内容
            merkleTreeContent: MerkleTreeDemo,
            // 证明内容
            merkleProofContent: MerkleProofDemo,
            // 树文件
            merkleTreeFile: null,
        }
    },
    components: {  },
    created(){

    },
    mounted(){

    },
    computed: {

    },
    watch:{
        
    },
    methods: {
        // 读取文件
        async readFile() {
            return new Promise((resolve, reject) => {  
                // 创建 FileReader 实例
                const reader = new FileReader();  
                // 以文本形式读取文件
                reader.readAsText(this.merkleTreeFile);
                reader.onload = (e) => {  
                    try {  
                        // 尝试解析文件内容
                        resolve(e.target.result);
                    } catch (error) {  
                        // 处理解析文件时的错误
                        reject(error);  
                    }  
                };  
                reader.onerror = (error) => {  
                    reject(error);  
                };  
            }); 
        },
        // 转换
        async convert() {
            try {
                // 读取文件
                let content = await this.readFile();
                // 尝试解析为 JSON若不是则报错
                JSON.parse(content);
                // 若正确则赋值
                this.merkleTreeContent = content;
            } catch (error) {
                console.error('Parsing error:', error);
                alert("The file content is not a valid JSON!");
                return;
            }
            // 创建树
            let tree = null;
            try {
                // 从文件中读取数据
                tree = StandardMerkleTree.load(JSON.parse(this.merkleTreeContent));
            } catch (error) {
                console.error(error);
                alert("Invalid merkle Tree!");
                return;
            }
            // 循环解析
            let data = { root: tree.root, leaves: [] };
            for (const [i, v] of tree.entries()) {
                let child = { input: v, proof: tree.getProof(i) };
                data.leaves.push(child);
            }
            // 赋值证明内容
            this.merkleProofContent = data;
            // 创建一个新的Blob对象，它代表了文件内容
            var blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
            // 创建一个指向该Blob的URL
            var url = window.URL.createObjectURL(blob);
            // 创建一个a标签
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            // 设置下载文件的名称
            downloadLink.download = "proof.json"; 
            // 添加链接到页面，并模拟点击它
            document.body.appendChild(downloadLink);
            // 触发下载
            downloadLink.click();
            // 清理并移除元素
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
        }
    }
}
</script>
<style scoped>

</style>